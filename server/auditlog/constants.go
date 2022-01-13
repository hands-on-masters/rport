package auditlog

const (
	ActionCreate       = "create"
	ActionGet          = "get"
	ActionDelete       = "delete"
	ActionUpdate       = "update"
	ActionExecuteStart = "execute.start"
	ActionExecuteDone  = "execute.done"
	ActionSuccess      = "action.success"
	ActionFailed       = "action.failed"
)

const (
	ApplicationAuthUser        = "auth.user"
	ApplicationAuthUserMe      = "auth.user.me"
	ApplicationAuthUserMeToken = "auth.user.me.token" //nolint:gosec
	ApplicationAuthUserTotP    = "auth.user.totp"
	ApplicationClient          = "client"
	ApplicationClientACL       = "client.acl"
	ApplicationClientAuth      = "client.auth"
	ApplicationClientGroup     = "client.group"
	ApplicationClientTunnel    = "client.tunnel"
	ApplicationClientCommand   = "client.command"
	ApplicationClientScript    = "client.script"
	ApplicationLibraryCommand  = "library.command"
	ApplicationLibraryScript   = "library.script"
	ApplicationVault           = "vault"
	ApplicationUploads         = "uploads"
)
