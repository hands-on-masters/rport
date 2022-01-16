package chclient

import (
	"bytes"
	"crypto/md5"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/pkg/sftp"

	"github.com/pkg/errors"

	"golang.org/x/crypto/ssh"

	"github.com/cloudradar-monitoring/rport/share/files"
	"github.com/cloudradar-monitoring/rport/share/logger"
	"github.com/cloudradar-monitoring/rport/share/models"
)

type SourceFileProvider interface {
	Open(path string) (io.ReadCloser, error)
}

type OptionsProvider interface {
	GetUploadDir() string
	GetFilePushDeny() []string
}

type UploadManager struct {
	*logger.Logger
	FilesAPI           files.FileAPI
	OptionsProvider    OptionsProvider
	SourceFileProvider SourceFileProvider
}

type SSHFileProvider struct {
	sshConn ssh.Conn
}

func (sfp SSHFileProvider) Open(path string) (io.ReadCloser, error) {
	conn := ssh.NewClient(sfp.sshConn, nil, nil)
	sftpCl, err := sftp.NewClient(conn)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to establish sftp connection to the server")
	}

	defer sftpCl.Close()

	return sftpCl.Open(path)
}

func NewSSHUploadManager(
	l *logger.Logger,
	filesAPI files.FileAPI,
	optionsProvider OptionsProvider,
	sshConn ssh.Conn,
) *UploadManager {
	sshFileProvider := &SSHFileProvider{
		sshConn: sshConn,
	}
	return &UploadManager{
		Logger:             l,
		FilesAPI:           filesAPI,
		OptionsProvider:    optionsProvider,
		SourceFileProvider: sshFileProvider,
	}
}

func (c *UploadManager) HandleUploadRequest(reqPayload []byte) (*models.UploadResponse, error) {
	c.Debugf("got request %s", string(reqPayload))

	uploadedFile, err := c.getUploadedFile(reqPayload)
	if err != nil {
		return nil, err
	}

	destinationFileExists, err := c.FilesAPI.Exist(uploadedFile.DestinationPath)
	if err != nil {
		return nil, err
	}

	if !destinationFileExists {
		return c.handleWritingFile(uploadedFile)
	}

	if uploadedFile.Sync {
		return c.handleFileSync(uploadedFile)
	}

	if uploadedFile.ForceWrite {
		return c.handleWritingFile(uploadedFile)
	}

	msg := fmt.Sprintf("file %s already exists and sync and force options were not enabled, will skip the request", uploadedFile.DestinationPath)
	c.Logger.Infof(msg)
	return &models.UploadResponse{
		UploadResponseShort: models.UploadResponseShort{
			ID:       uploadedFile.ID,
			Filepath: uploadedFile.DestinationPath,
		},
		Message: msg,
		Status:  "ignored",
	}, nil
}

func (c *UploadManager) handleFileSync(uploadedFile *models.UploadedFile) (resp *models.UploadResponse, err error) {
	file, err := c.FilesAPI.Open(uploadedFile.DestinationPath)
	if err != nil {
		return nil, err
	}

	md5Hash := md5.New()
	_, err = io.Copy(md5Hash, file)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to calculate md5 checksum for %s", uploadedFile.DestinationPath)
	}

	msgParts := []string{}
	uploadResponse := &models.UploadResponse{
		UploadResponseShort: models.UploadResponseShort{
			ID:       uploadedFile.ID,
			Filepath: uploadedFile.DestinationPath,
		},
	}

	destinationMd5Hash := md5Hash.Sum(nil)
	if !bytes.Equal(uploadedFile.Md5Checksum, destinationMd5Hash) {
		c.Logger.Debugf(
			"uploaded file has non matching md5 hash %x with destination file %x, as sync is true, will overwrite the file %s",
			uploadedFile.Md5Checksum,
			destinationMd5Hash,
			uploadedFile.DestinationPath,
		)

		uploadResponse.UploadResponseShort.SizeBytes, err = c.copyFileToDestination(uploadedFile)
		if err != nil {
			return nil, err
		}
		msgParts = append(msgParts, "file successfully copied to destination")
	}

	err = c.chownFileInDestination(uploadedFile)
	if err != nil {
		c.Logger.Errorf(err.Error())
		msgParts = append(msgParts, fmt.Sprintf("chown failed: %v", err))
	}

	err = c.chmodFileInDestination(uploadedFile)
	if err != nil {
		c.Logger.Errorf(err.Error())
		msgParts = append(msgParts, fmt.Sprintf("chmod failed: %v", err))
	}

	if len(msgParts) == 0 {
		msgParts = append(msgParts, "File sync success")
	}

	uploadResponse.Status = "success"
	uploadResponse.Message = strings.Join(msgParts, ". ")
	c.Logger.Debugf(uploadResponse.Message)

	return uploadResponse, nil
}

func (c *UploadManager) handleWritingFile(uploadedFile *models.UploadedFile) (resp *models.UploadResponse, err error) {
	copiedBytes, err := c.copyFileToDestination(uploadedFile)
	if err != nil {
		return nil, err
	}

	msgParts := []string{
		"file successfully copied to destination",
	}

	err = c.chownFileInDestination(uploadedFile)
	if err != nil {
		msgParts = append(msgParts, fmt.Sprintf("chown failed: %v", err))
	}

	err = c.chmodFileInDestination(uploadedFile)
	if err != nil {
		msgParts = append(msgParts, fmt.Sprintf("chmod failed: %v", err))
	}

	message := strings.Join(msgParts, ".")
	c.Logger.Debugf(message)

	return &models.UploadResponse{
		UploadResponseShort: models.UploadResponseShort{
			ID:        uploadedFile.ID,
			Filepath:  uploadedFile.DestinationPath,
			SizeBytes: copiedBytes,
		},
		Status:  "success",
		Message: message,
	}, nil
}

func (c *UploadManager) chownFileInDestination(uploadedFile *models.UploadedFile) (err error) {
	if uploadedFile.DestinationFileOwner == "" && uploadedFile.DestinationFileGroup == "" {
		return nil
	}

	err = c.FilesAPI.ChangeOwner(uploadedFile.DestinationPath, uploadedFile.DestinationFileOwner, uploadedFile.DestinationFileGroup)
	if err != nil {
		return err
	}

	c.Logger.Debugf(
		"chowned file %s, %s:%s",
		uploadedFile.DestinationPath,
		uploadedFile.DestinationFileOwner,
		uploadedFile.DestinationFileGroup,
	)

	return nil
}

func (c *UploadManager) chmodFileInDestination(uploadedFile *models.UploadedFile) (err error) {
	if uploadedFile.DestinationFileMode == 0 {
		return nil
	}

	err = c.FilesAPI.ChangeMode(uploadedFile.DestinationPath, uploadedFile.DestinationFileMode)
	if err != nil {
		return err
	}

	c.Logger.Debugf(
		"chmoded file %s: %v",
		uploadedFile.DestinationPath,
		uploadedFile.DestinationFileMode,
	)

	return nil
}

func (c *UploadManager) copyFileToDestination(uploadedFile *models.UploadedFile) (copiedBytes int64, err error) {
	copiedBytes, tempFilePath, err := c.copyFileToTempLocation(
		uploadedFile.SourceFilePath,
		uploadedFile.DestinationFileMode,
		uploadedFile.Md5Checksum,
	)
	if err != nil {
		return 0, err
	}
	c.Logger.Debugf("moved temp file %s to the target path %s", tempFilePath, uploadedFile.DestinationPath)

	err = c.prepareDestinationDir(uploadedFile.DestinationPath, uploadedFile.DestinationFileMode)
	if err != nil {
		return 0, err
	}

	destinationFileExists, err := c.FilesAPI.Exist(uploadedFile.DestinationPath)
	if err != nil {
		return 0, err
	}
	if destinationFileExists {
		c.Logger.Debugf("destination file %s already exists, will delete it", uploadedFile.DestinationPath)
		err = c.FilesAPI.Remove(uploadedFile.DestinationPath)
		if err != nil {
			return 0, err
		}
	}

	err = c.FilesAPI.Rename(tempFilePath, uploadedFile.DestinationPath)
	if err != nil {
		return 0, err
	}

	return copiedBytes, nil
}

func (c *UploadManager) prepareDestinationDir(destinationPath string, mode os.FileMode) error {
	destinationDir := filepath.Dir(destinationPath)

	if mode == 0 {
		mode = files.DefaultMode
	}

	destinationDirWasCreated, err := c.FilesAPI.CreateDirIfNotExists(destinationDir, mode)
	if err != nil {
		return err
	}
	if destinationDirWasCreated {
		c.Logger.Debugf("created destination file dir %s for the uploaded file", destinationDir)
	}

	return nil
}

func (c *UploadManager) copyFileToTempLocation(remoteFilePath string, targetFileMode os.FileMode, expectedMd5Checksum []byte) (
	bytesCopied int64,
	tempFilePath string,
	err error,
) {
	tempFileName := filepath.Base(remoteFilePath)

	if targetFileMode == 0 {
		targetFileMode = files.DefaultMode
	}

	tempDirWasCreated, err := c.FilesAPI.CreateDirIfNotExists(c.OptionsProvider.GetUploadDir(), targetFileMode)
	if err != nil {
		return 0, "", err
	}
	if tempDirWasCreated {
		c.Logger.Debugf("created temp dir %s for uploaded files", c.OptionsProvider.GetUploadDir())
	}

	tempFilePath = filepath.Join(c.OptionsProvider.GetUploadDir(), tempFileName)

	tempFileExists, err := c.FilesAPI.Exist(tempFilePath)
	if err != nil {
		return 0, tempFilePath, err
	}

	if tempFileExists {
		c.Logger.Debugf("temp file %s already exists, will delete it", tempFilePath)
		err = c.FilesAPI.Remove(tempFilePath)
		if err != nil {
			return 0, tempFilePath, err
		}
	}

	remoteFile, err := c.SourceFileProvider.Open(remoteFilePath)
	if err != nil {
		return 0, tempFilePath, err
	}
	defer remoteFile.Close()

	copiedBytes, md5Checksum, err := c.FilesAPI.CreateFile(tempFilePath, remoteFile)
	if err != nil {
		return 0, tempFilePath, err
	}
	c.Logger.Debugf("copied %d bytes from server path %s to temp path %s, md5: %x", copiedBytes, remoteFilePath, tempFilePath, md5Checksum)

	compareRes := bytes.Compare(md5Checksum, expectedMd5Checksum)
	if compareRes != 0 {
		err := c.FilesAPI.Remove(tempFilePath)
		if err != nil {
			c.Logger.Errorf("failed to remove %s: %v", tempFilePath, err)
		}

		return 0,
			tempFilePath,
			fmt.Errorf(
				"md5 check failed: checksum from server %x doesn't equal the calculated checksum %x",
				expectedMd5Checksum,
				md5Checksum,
			)
	}

	return copiedBytes, tempFilePath, nil
}

func (c *UploadManager) getUploadedFile(reqPayload []byte) (*models.UploadedFile, error) {
	uploadedFile := new(models.UploadedFile)
	err := uploadedFile.FromBytes(reqPayload)
	if err != nil {
		return nil, err
	}
	err = uploadedFile.Validate()
	if err != nil {
		return nil, err
	}

	err = uploadedFile.ValidateDestinationPath(c.OptionsProvider.GetFilePushDeny(), c.Logger)
	if err != nil {
		return nil, err
	}

	return uploadedFile, nil
}