import{_ as o,r as a,o as r,c as d,a as t,b as s,e,d as n}from"./app.2bd674b4.js";const c={},l=t("h1",{id:"scripts",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#scripts","aria-hidden":"true"},"#"),e(" Scripts")],-1),u=t("p",null,"Rport allows to store your scripts for later reuse, so you can share them with your teammates and to have access to them from anywhere.",-1),p=t("h2",{id:"scripts-management",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#scripts-management","aria-hidden":"true"},"#"),e(" Scripts management")],-1),v=e("You can manage script with the "),m={href:"https://apidoc.rport.io/master/#tag/Scripts",target:"_blank",rel:"noopener noreferrer"},h=e("REST API"),b=e("."),f=n(`<p>The <code>/library/scripts</code> endpoints allow you to create, update, delete and list scripts.</p><h3 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> Create</h3><p>To create a script, provide following input:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/library/scripts&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
	&quot;name&quot;: &quot;current_directory&quot;,
	&quot;interpreter&quot;: &quot;/bin/sh&quot;,
	&quot;is_sudo&quot;: true,
	&quot;cwd&quot;: &quot;/root&quot;,
	&quot;script&quot;: &quot;pwd&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="params" tabindex="-1"><a class="header-anchor" href="#params" aria-hidden="true">#</a> Params:</h3><ul><li><em>name</em> any text to identify the script</li><li><em>interpreter</em> script syntax interpreter which is used for execution, e.g. <code>sh</code>, <code>cmd.exe</code>, <code>powershell</code>, <code>tacoscript</code>, default values: <code>sh</code> (under Linux) and <code>cmd.exe</code> (under Windows). See more about interpreter option below.</li><li><em>sudo</em> true or false if this script should be executed under a sudo user</li><li><em>cwd</em> an optional directory where the script will be executed</li><li><em>script</em> the text of the script to execute</li></ul><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> Update</h3><p>You should know the script unique id to update it e.g. <code>4943d682-7874-4f7a-999c-b4ff5493fc3f</code>. You can use scripts list API to find ID of a corresponding script.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X PUT &#39;http://localhost:3000/api/v1/library/scripts/4943d682-7874-4f7a-999c-b4ff5493fc3f&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
	&quot;name&quot;: &quot;current_directory&quot;,
	&quot;interpreter&quot;: &quot;/bin/sh&quot;,
	&quot;is_sudo&quot;: true,
	&quot;cwd&quot;: &quot;/root&quot;,
	&quot;script&quot;: &quot;pwd&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Please note, that you should provide all parameters as partial updates are not supported.</p><h3 id="list-scripts" tabindex="-1"><a class="header-anchor" href="#list-scripts" aria-hidden="true">#</a> List scripts</h3><p>This API allows to list all stored scripts.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X GET &#39;http://localhost:3000/api/v1/library/scripts&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The response will be</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: [
        {
            &quot;id&quot;: &quot;4943d682-7874-4f7a-999c-b4ff5493fc3f&quot;,
            &quot;name&quot;: &quot;current directory&quot;,
            &quot;created_by&quot;: &quot;admin&quot;,
            &quot;created_at&quot;: &quot;2021-05-18T09:30:27+03:00&quot;,
            &quot;interpreter&quot;: &quot;/bin/bash&quot;,
            &quot;is_sudo&quot;: true,
            &quot;cwd&quot;: &quot;/root&quot;,
            &quot;script&quot;: &quot;pwd&quot;,
        },
        {
            &quot;id&quot;: &quot;4943d682-7874-4f7a-999c-12r2343241&quot;,
            &quot;name&quot;: &quot;hostname&quot;,
            &quot;created_by&quot;: &quot;admin&quot;,
            &quot;created_at&quot;: &quot;2021-05-19T19:31:57+03:00&quot;,
            &quot;interpreter&quot;: &quot;/bin/sh&quot;,
            &quot;is_sudo&quot;: false,
            &quot;cwd&quot;: &quot;/root&quot;,
            &quot;script&quot;: &quot;hostname&quot;,
        },
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sort" tabindex="-1"><a class="header-anchor" href="#sort" aria-hidden="true">#</a> Sort</h3><p>You can sort entries by <code>id</code>,<code>name</code>,<code>created_by</code>,<code>created_at</code> fields:</p><p>e.g. <code>http://localhost:3000/api/v1/library/scripts?sort=created_at</code> - gives you scripts sorted by date of creation in ascending order.</p><p>To change the sorting order by adding <code>-</code> to a field name. e.g. <code>http://localhost:3000/api/v1/library/scripts?sort=-created_at</code> - gives you scripts sorted by date of creation where the newest entries will be listed first.</p><p>You can sort by multiple fields and any combination of sort directions: e.g. <code>http://localhost:3000/api/v1/library/scripts?sort=created_at&amp;sort=-name</code> - gives you entries sorted by creation date. If multiple entries are created at the same time, they will be sorted by name in descending order.</p><h3 id="filter" tabindex="-1"><a class="header-anchor" href="#filter" aria-hidden="true">#</a> Filter</h3><p>You can filter entries by <code>id</code>,<code>name</code>,<code>created_by</code>,<code>created_at</code> fields:</p><p><code>http://localhost:3000/api/v1/library/scripts?filter[name]=current_directory</code> will list scripts with the name <code>current_directory</code>.</p><p>You can combine filters for multiple fields: <code>http://localhost:3000/api/v1/library/scripts?filter[name]=current_directory&amp;filter[created_by]=admin</code> - gives you a list of scripts with name <code>current_directory</code> and created by <code>admin</code>.</p><p>You can also specify multiple filter values e.g. <code>http://localhost:3000/api/v1/library/scripts?filter[name]=script1,scriptX</code> - gives you scripts <code>script1</code> or <code>scriptX</code>.</p><p>You can also combine both sort and filter queries in a single request:</p><p><code>http://localhost:3000/api/v1/library/scripts?sort=created_at&amp;filter[created_by]=admin</code> - gives you scripts created by <code>admin</code> sorted by <code>created_at</code> in order of creation.</p><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><p>You should know the script unique id to delete it e.g. <code>4943d682-7874-4f7a-999c-b4ff5493fc3f</code>. You can use scripts list API to find ID of a corresponding script.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -u admin:foobaz -X DELETE &#39;http://localhost:3000/api/v1/library/scripts/4943d682-7874-4f7a-999c-b4ff5493fc3f&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="show-a-single-script" tabindex="-1"><a class="header-anchor" href="#show-a-single-script" aria-hidden="true">#</a> Show a single script</h3><p>To show a single script you need to know it&#39;s id e.g. <code>4943d682-7874-4f7a-999c-b4ff5493fc3f</code>. You can use scripts list API to find ID of a corresponding script.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -u admin:foobaz -XGET &#39;http://localhost:3000/api/v1/library/scripts/4943d682-7874-4f7a-999c-b4ff5493fc3f&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The response will be:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;4943d682-7874-4f7a-999c-b4ff5493fc3f&quot;,
        &quot;name&quot;: &quot;current directory&quot;,
        &quot;created_by&quot;: &quot;admin&quot;,
        &quot;created_at&quot;: &quot;2021-05-18T09:30:27+03:00&quot;,
        &quot;interpreter&quot;: &quot;/bin/bash&quot;,
        &quot;is_sudo&quot;: true,
        &quot;cwd&quot;: &quot;/root&quot;,
        &quot;script&quot;: &quot;pwd&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scripts-execution" tabindex="-1"><a class="header-anchor" href="#scripts-execution" aria-hidden="true">#</a> Scripts execution</h2><p>On the client using the <code>rport.conf</code> you can enable or disable execution of remote scripts.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[remote-scripts]
## Enable or disable remote scripts.
## Defaults: true
#enabled = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Please note that scripts execution requires commands execution to be enabled (check https://oss.rport.io/docs/no06-command-execution.html#securing-your-environment or <code>[remote-commands]</code> enabled flag of configuration).</p><p>Similar to command execution, you can run scripts both by calling a REST or websocket interface. In all cases the scripts are executed by the following algorithm:</p><ul><li>Rport server calls each client to create a script file. The script file will get a random unique name and will be placed in the folder specified as <code>data_dir</code> from configuration + <code>scripts</code>:</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[client]
data_dir = &#39;/var/lib/rport/scripts&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Rport calls the existing command API to execute the script on the target client, e.g.:</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sh /var/lib/rport/scripts/f68a779d-1d46-414a-b165-d8d2df5f348c.sh #Linux/macOS

cmd C:\\Users\\me\\AppData\\Local\\Temp\\f68a779d-1d46-414a-b165-d8d2df5f348c.bat #Windows non-powershell execution

powershell -executionpolicy bypass -file C:\\Users\\me\\AppData\\Local\\Temp\\f68a779d-1d46-414a-b165-d8d2df5f348c.ps1 #Windows powershell execution
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Rport deletes the temp script file in any case disregard if script execution fails or not.</li></ul><p><strong>NOTE</strong> To execute scripts you need to allow execution of the corresponding script command (see https://oss.rport.io/docs/no06-command-execution.html#securing-your-environment)</p><h3 id="script-execution-via-rest-interface" tabindex="-1"><a class="header-anchor" href="#script-execution-via-rest-interface" aria-hidden="true">#</a> Script execution via REST interface</h3><p>To execute script on a certain client you would need a client id e.g. <code>b6b28b13-be4a-4a78-bb39-eca132c434fb</code> and an access token. The script&#39;s payload should be base64 encoded:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/clients/4943d682-7874-4f7a-999c-b4ff5493fc3f/scripts&#39; \\
-H &#39;Authorization: Bearer eyJhbGcidfasjflInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdfasfdjoiMTEzMzkyNjMxNTA0MDYwOTU1MCJ9.JG4whDXeDKDuZqgVA \\
-H &#39;Content-Type: application/javascript&#39; \\
--data-raw &#39;{
  &quot;script&quot;: &quot;cHdkCg==&quot;,
  &quot;timeout_sec&quot;: 60,
  &quot;interpreter&quot;:&quot;powershell&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>as a result you will get a unique job id for the executable script e.g.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;jid&quot;: &quot;24bd86ba-1fd4-48c1-9620-6879f196b8de&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>to customize script execution you can provide additional JSON fields in the request body:</p><ul><li><code>interpreter:powershell</code> to execute script with powershell under Windows</li><li><code>is_sudo:true</code> to execute script as sudo under Linux or macOS</li><li><code>cwd:/tmp/script</code> to change the default folder for the script execution</li><li><code>timeout:10s</code> to set the timeout for the corresponding script execution</li></ul><p>Here is an example of a script execution with all parameters enabled:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/clients/4943d682-7874-4f7a-999c-b4ff5493fc3f/scripts&#39; \\
-H &#39;Authorization: Bearer eyJhbGcidfasjflInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdfasfdjoiMTEzMzkyNjMxNTA0MDYwOTU1MCJ9.JG4whDXeDKDuZqgVA \\
-H &#39;Content-Type: application/x-www-form-urlencoded&#39; \\
--data-raw &#39;{
  &quot;script&quot;: &quot;cHdkCg==&quot;,
  &quot;interpreter&quot;: &quot;cmd&quot;,
  &quot;cwd&quot;: &quot;string&quot;,
  &quot;is_sudo&quot;: true,
  &quot;timeout_sec&quot;: 60
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,55),q=e("you can check the status of the command execution by calling "),g={href:"https://apidoc.rport.io/master/#operation/ClientCommandsJobGet",target:"_blank",rel:"noopener noreferrer"},x=e("client commands API"),y=e("."),_=n(`<p>You can execute a script on multiple clients by calling <code>scripts</code> API, in this case you should provide client ids in the input body:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/scripts&#39; \\
-H &#39;Authorization: Bearer eyJhbGcidfasjflInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdfasfdjoiMTEzMzkyNjMxNTA0MDYwOTU1MCJ9.JG4whDXeDKDuZqgVA \\
-H &#39;Content-Type: application/javascript&#39; \\
--data-raw &#39;{
  &quot;script&quot;: &quot;cHdkCg==&quot;,
  &quot;client_ids&quot;: [
    &quot;8e995525-b18f-44a4-ae83-f3b8fd5a5ff8&quot;,
    &quot;eabb80c4-fa17-46e5-a965-0ea442fa0e83&quot;
  ],
  &quot;timeout_sec&quot;: 60,
  &quot;execute_concurrently&quot;: false,
  &quot;abort_on_error&quot;: true,
  &quot;interpreter&quot;:&quot;powershell&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="customizing-an-interpreter" tabindex="-1"><a class="header-anchor" href="#customizing-an-interpreter" aria-hidden="true">#</a> Customizing an interpreter</h3><p>You can specify an interpreter for the script execution. Default values are <code>/bin/sh</code> for Linux/Mac OS and <code>cmd</code> for Windows. Alternative values as <code>powershell</code> for Windows or <code>tacoscript</code> for Linux and Windows are also possible.</p><p>You can use an absolute path to a non-standard interpreters of your choice, e.g. <code>/usr/local/bin/zsh</code> or <code>C:\\Program Files\\PowerShell\\7\\pwsh.exe</code>.</p><p>For Linux or Mac OS make sure, that your non-standard interpreter supports <code>-c</code> flag which is used to provide a command to execute.</p><p>If you use a custom powershell path under Windows, e.g. <code>C:\\Program Files\\PowerShell\\7\\pwsh.exe</code>, the parameters for script execution <code>-Noninteractive -executionpolicy bypass -File</code> will be added automatically only if the path to the executable contains &quot;powershell&quot; word (case insensitive).</p><p>For fast and unified script execution with different interpreters and shells, you can specify aliases. Instead of providing the full path to the shell, sending the alias is sufficient. You can specify aliases in <code>rport.conf</code> (see <code>rport.example.conf</code>), see <code>[interpreter-aliases]</code> section. Having aliases list</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>## Examples:
 # pwsh7 = &#39;C:\\Program Files\\PowerShell\\7\\pwsh.exe&#39;
 # latestbash = &#39;C:\\Program Files\\Git\\bin\\bash.exe&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>allows you to use <code>pwsh7</code> or <code>latestbash</code> as interpreter in the script execution APIs.</p><h3 id="script-execution-via-websocket-interface" tabindex="-1"><a class="header-anchor" href="#script-execution-via-websocket-interface" aria-hidden="true">#</a> Script execution via websocket interface</h3>`,11),w=e("You can use "),I={href:"https://apidoc.rport.io/master/#operation/WsCommandsGet",target:"_blank",rel:"noopener noreferrer"},T=e("our testing API for Websockets"),k=e(". To use this API, enable testing endpoints by setting "),C=t("code",null,"enable_ws_test_endpoints",-1),S=e(" flag to true in the "),Y=t("code",null,"[server]",-1),A=e(" section of configuration file:"),G=n(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[server]
...
  enable_ws_test_endpoints = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Restart Rport server and go to: <code>{YOUR_RPORT_ADDRESS}/api/v1/test/scripts/ui</code></p><p>Put an access token and a client ids in the corresponding fields. You can also provide <code>interpreter</code>, <code>is_sudo</code>, <code>cwd</code>, <code>timeout</code> parameters as described above.</p><p>Click Open to start websocket connection.</p><p>Put the input data in JSON format with the base64 encoded script to the input field and click Send. The payload will be transmitted via Websocket protocol. Once the clients finish the execution, they will send back the response which you&#39;ll see in the Output field.</p><h3 id="execution-of-taco-scripts" tabindex="-1"><a class="header-anchor" href="#execution-of-taco-scripts" aria-hidden="true">#</a> Execution of taco scripts</h3>`,6),P={href:"https://github.com/cloudradar-monitoring/tacoscript",target:"_blank",rel:"noopener noreferrer"},z=e("tacoscript"),D=e(" interpreter can be used to execute scripts in a Saltstack similar format for both Windows and Linux machines. Tacoscript interpreter doesn't require additional libraries or tools to be installed in the system and it has capabilities for:"),j=n(`<ul><li>conditional execution depending on command exit codes, present/missing files, host system information (e.g. os version)</li><li>installing/uninstalling/upgrading packages</li><li>creating files</li><li>dependant executions (e.g. script A depends on execution of script B etc)</li><li>reserved values from the information about the host system</li><li>reusable variables</li></ul><p>To execute a taco script, you need to specify <code>tacoscript</code> as an interpreter, e.g.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/clients/4943d682-7874-4f7a-999c-b4ff5493fc3f/scripts&#39; \\
-H &#39;Authorization: Bearer eyJhbGcidfasjflInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdfasfdjoiMTEzMzkyNjMxNTA0MDYwOTU1MCJ9.JG4whDXeDKDuZqgVA \\
-H &#39;Content-Type: application/x-www-form-urlencoded&#39; \\
--data-raw &#39;{
  &quot;script&quot;: &quot;IwojIEZpcnN0IGV4YW1wbGUgb2YgYSB0YWNvc2NyaXB0IGZvbGxvd2luZyB0aGUgc3ludGF4IG9mIFNhbHQKIyBidXQgbm90IGltcGxlbWVudGluZyBhbGwgb3B0aW9ucwojIGh0dHBzOi8vZG9jcy5zYWx0c3RhY2suY29tL2VuL2xhdGVzdC9yZWYvc3RhdGVzL2FsbC9zYWx0LnN0YXRlcy5jbWQuaHRtbAojCiMgdW5pcXVlIGlkIG9mIHRoZSB0YXNrLCBjYW4gYmUgYW55IHN0cmluZwpkYXRlIGNvbW1hbmQ6CiAgY21kLnJ1bjoKICAgIC0gbmFtZXM6CiAgICAgIC0gZGF0ZQo=&quot;,
  &quot;interpreter&quot;: &quot;tacoscript&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Where the base64 encoded script looks like this:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#
# First example of a tacoscript following the syntax of Salt
# but not implementing all options
# https://docs.saltstack.com/en/latest/ref/states/all/salt.states.cmd.html
#
# unique id of the task, can be any string
date command:
  cmd.run:
    - names:
      - date
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),X=e("As a result this script will output the current date. In order to execute taco scripts, there should be "),W=t("code",null,"tacoscript",-1),J=e(" binary avalable in the system path (see here "),M={href:"https://github.com/cloudradar-monitoring/tacoscript#installation",target:"_blank",rel:"noopener noreferrer"},N=e("the installation instructions"),O=e(")");function R(V,E){const i=a("ExternalLinkIcon");return r(),d("div",null,[l,u,p,t("p",null,[v,t("a",m,[h,s(i)]),b]),f,t("p",null,[q,t("a",g,[x,s(i)]),y]),_,t("p",null,[w,t("a",I,[T,s(i)]),k,C,S,Y,A]),G,t("p",null,[t("a",P,[z,s(i)]),D]),j,t("p",null,[X,W,J,t("a",M,[N,s(i)]),O])])}var L=o(c,[["render",R],["__file","no14-scripts.html.vue"]]);export{L as default};
