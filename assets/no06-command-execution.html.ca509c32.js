import{_ as o,r as s,o as l,c as a,a as e,b as i,w as c,e as n,d}from"./app.2bd674b4.js";const r={},v=e("h1",{id:"command-execution",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#command-execution","aria-hidden":"true"},"#"),n(" Command execution")],-1),m=e("p",null,"Via the API you can execute a command on connected clients. The command and the response are transferred through the web socket connection. A tunnel is not needed.",-1),q=e("p",null,"Command can be executed via:",-1),b={href:"https://apidoc.rport.io/master/#tag/Commands",target:"_blank",rel:"noopener noreferrer"},h=n("REST API"),p={href:"https://apidoc.rport.io/master/#operation/WsCommandsGet",target:"_blank",rel:"noopener noreferrer"},f=n("WebSocket API"),_=d(`<p>Here we would show examples how to do it via REST API.</p><h2 id="execute-on-a-single-host" tabindex="-1"><a class="header-anchor" href="#execute-on-a-single-host" aria-hidden="true">#</a> Execute on a single host</h2><p>Example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=my-client
curl -s -u admin:foobaz http://localhost:3000/api/v1/clients/$CLIENTID/commands -H &quot;Content-Type: application/json&quot; -X POST \\
--data-raw &#39;{
  &quot;command&quot;: &quot;date&quot;,
  &quot;timeout_sec&quot;: 10
}&#39;|jq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You will get back a job id. Now execute a query to get the result of the command.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>JOBID=f72b69fd-f418-40c3-ab62-4ce2c2022c58
curl -s -u admin:foobaz http://localhost:3000/api/v1/clients/$CLIENTID/commands/$JOBID|jq
{
    &quot;data&quot;: {
        &quot;jid&quot;: &quot;f72b69fd-f418-40c3-ab62-4ce2c2022c58&quot;,
        &quot;status&quot;: &quot;successful&quot;,
        &quot;finished_at&quot;: &quot;2020-10-15T15:30:12.937267522Z&quot;,
        &quot;client_id&quot;: &quot;my-client&quot;,
        &quot;command&quot;: &quot;date&quot;,
        &quot;cwd&quot;: &quot;/users/root&quot;,
        &quot;is_sudo&quot;: false,
        &quot;interpreter&quot;: &quot;/bin/sh&quot;,
        &quot;pid&quot;: 908526,
        &quot;started_at&quot;: &quot;2020-10-15T15:30:12.934238782Z&quot;,
        &quot;created_by&quot;: &quot;admin&quot;,
        &quot;timeout_sec&quot;: 10,
        &quot;result&quot;: {
            &quot;stdout&quot;: &quot;Thu Oct 15 15:30:12 UTC 2020\\n&quot;,
            &quot;stderr&quot;: &quot;&quot;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The rport client supervises the command for the given {timeout_sec} seconds. If the timeout is exceeded the command state is considered &#39;unknown&#39; but the command keeps running.</p><h2 id="execute-on-multiple-hosts" tabindex="-1"><a class="header-anchor" href="#execute-on-multiple-hosts" aria-hidden="true">#</a> Execute on multiple hosts</h2><p>It can be done by using:</p><ul><li>client IDs</li><li>group IDs</li><li>both client IDs and group IDs</li></ul><p>Execution options:</p><ul><li><code>execute_concurrently</code>. By default, commands are not executed concurrently. To execute it concurrently set it to <code>true</code> in a request.</li><li><code>abort_on_error</code>. By default, if the execution fails on some client, the entire cycle is aborted. But it is ignored in parallel mode when <code>&quot;execute concurrently&quot;: true</code>. Disabling <code>abort_on_error</code> executes the command on all clients regardless there is an error or not.</li></ul><h3 id="by-client-ids" tabindex="-1"><a class="header-anchor" href="#by-client-ids" aria-hidden="true">#</a> By client IDs</h3><p>Example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/commands -H &quot;Content-Type: application/json&quot; -X POST \\
--data-raw &#39;{
  &quot;command&quot;: &quot;/bin/date&quot;,
  &quot;client_ids&quot;: [&quot;local-test-client-2&quot;, &quot;local-test-client-3&quot;, &quot;local-test-client-4&quot;],
  &quot;timeout_sec&quot;: 30,
  &quot;cwd&quot;: &quot;/users/root&quot;,
  &quot;is_sudo&quot;: false,
  &quot;execute_concurrently&quot;: true
}
&#39;|jq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You will get back a job id. Now execute a query to get the result of the command.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>JOBID=f206854c-af1d-4589-9adc-bdf3553ec68b
curl -s -u admin:foobaz http://localhost:3000/api/v1/commands/$JOBID|jq
{
  &quot;data&quot;: {
    &quot;jid&quot;: &quot;f206854c-af1d-4589-9adc-bdf3553ec68b&quot;,
    &quot;started_at&quot;: &quot;2021-01-28T19:39:16.197965+02:00&quot;,
    &quot;created_by&quot;: &quot;admin&quot;,
    &quot;client_ids&quot;: [
      &quot;local-test-client-2&quot;,
      &quot;local-test-client-3&quot;,
      &quot;local-test-client-4&quot;
    ],
    &quot;group_ids&quot;: null,
    &quot;command&quot;: &quot;/bin/date&quot;,
    &quot;cwd&quot;: &quot;&quot;,
    &quot;is_sudo&quot;: false,
    &quot;interpreter&quot;: &quot;&quot;,
    &quot;timeout_sec&quot;: 30,
    &quot;concurrent&quot;: true,
    &quot;abort_on_err&quot;: false,
    &quot;jobs&quot;: [
      {
        &quot;jid&quot;: &quot;4012fcf8-0dfc-44c4-a3de-de1b133bb13e&quot;,
        &quot;status&quot;: &quot;successful&quot;,
        &quot;finished_at&quot;: &quot;2021-01-28T19:39:16.227685+02:00&quot;,
        &quot;client_id&quot;: &quot;local-test-client-2&quot;,
        &quot;command&quot;: &quot;/bin/date&quot;,
        &quot;cwd&quot;: &quot;&quot;,
        &quot;is_sudo&quot;: false,
        &quot;interpreter&quot;: &quot;/bin/sh&quot;,
        &quot;pid&quot;: 16242,
        &quot;started_at&quot;: &quot;2021-01-28T19:39:16.203396+02:00&quot;,
        &quot;created_by&quot;: &quot;admin&quot;,
        &quot;timeout_sec&quot;: 30,
        &quot;multi_job_id&quot;: &quot;f206854c-af1d-4589-9adc-bdf3553ec68b&quot;,
        &quot;result&quot;: {
          &quot;stdout&quot;: &quot;Thu Jan 28 19:39:16 EET 2021\\n&quot;,
          &quot;stderr&quot;: &quot;&quot;
        }
      },
      {
        &quot;jid&quot;: &quot;7b8d90a0-f100-4922-98e6-4da46853c020&quot;,
        &quot;status&quot;: &quot;successful&quot;,
        &quot;finished_at&quot;: &quot;2021-01-28T19:39:16.229916+02:00&quot;,
        &quot;client_id&quot;: &quot;local-test-client-3&quot;,
        &quot;command&quot;: &quot;/bin/date&quot;,
        &quot;cwd&quot;: &quot;&quot;,
        &quot;is_sudo&quot;: false,
        &quot;interpreter&quot;: &quot;/bin/sh&quot;,
        &quot;pid&quot;: 16241,
        &quot;started_at&quot;: &quot;2021-01-28T19:39:16.203738+02:00&quot;,
        &quot;created_by&quot;: &quot;admin&quot;,
        &quot;timeout_sec&quot;: 30,
        &quot;multi_job_id&quot;: &quot;f206854c-af1d-4589-9adc-bdf3553ec68b&quot;,
        &quot;result&quot;: {
          &quot;stdout&quot;: &quot;Thu Jan 28 19:39:16 EET 2021\\n&quot;,
          &quot;stderr&quot;: &quot;&quot;
        }
      },
      {
        &quot;jid&quot;: &quot;bb936408-8c02-49b2-a0ac-2750ac44026c&quot;,
        &quot;status&quot;: &quot;successful&quot;,
        &quot;finished_at&quot;: &quot;2021-01-28T19:39:16.228102+02:00&quot;,
        &quot;client_id&quot;: &quot;local-test-client-4&quot;,
        &quot;command&quot;: &quot;/bin/date&quot;,
        &quot;cwd&quot;: &quot;&quot;,
        &quot;is_sudo&quot;: false,
        &quot;interpreter&quot;: &quot;/bin/sh&quot;,
        &quot;pid&quot;: 16243,
        &quot;started_at&quot;: &quot;2021-01-28T19:39:16.204308+02:00&quot;,
        &quot;created_by&quot;: &quot;admin&quot;,
        &quot;timeout_sec&quot;: 30,
        &quot;multi_job_id&quot;: &quot;f206854c-af1d-4589-9adc-bdf3553ec68b&quot;,
        &quot;result&quot;: {
          &quot;stdout&quot;: &quot;Thu Jan 28 19:39:16 EET 2021\\n&quot;,
          &quot;stderr&quot;: &quot;&quot;
        }
      }
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="by-client-group-ids" tabindex="-1"><a class="header-anchor" href="#by-client-group-ids" aria-hidden="true">#</a> By client group IDs</h3>`,18),x=n("How to create client groups please see "),g=n("the link"),y=n("."),w=d(`<p>Assume we have already created a client group with <code>group-1</code> id. Example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/commands -H &quot;Content-Type: application/json&quot; -X POST \\
--data-raw &#39;{
  &quot;command&quot;: &quot;/bin/date&quot;,
  &quot;group_ids&quot;: [&quot;group-1&quot;],
  &quot;execute_concurrently&quot;: false,
  &quot;abort_on_error&quot;: true,
  &quot;cwd&quot;: &quot;/users/root&quot;,
  &quot;is_sudo&quot;: true
}
&#39;|jq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You will get back a job id. Now execute the same query that is in a previous example to get the result of the command.</p><h2 id="securing-your-environment" tabindex="-1"><a class="header-anchor" href="#securing-your-environment" aria-hidden="true">#</a> Securing your environment</h2><p>The commands are executed from the account that runs rport. On Linux this by default an unprivileged user. Do not run rport as root. On Windows, rport runs as a local service account that by default has administrative rights.</p><p>On the client using the <code>rport.conf</code> you can configure and limit the execution of remote commands.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[remote-commands]
## Enable or disable remote commands.
## Defaults: true
#enabled = true

## Allow commands matching the following regular expressions.
## The filter is applied to the command sent. Full path must be used.
## See {order} parameter for more details how it&#39;s applied together with {deny}.
## Defaults: [&#39;^/usr/bin/.*&#39;,&#39;^/usr/local/bin/.*&#39;,&#39;^C:\\\\Windows\\\\System32\\\\.*&#39;]
#allow = [&#39;^/usr/bin/.*&#39;,&#39;^/usr/local/bin/.*&#39;,&#39;^C:\\\\Windows\\\\System32\\\\.*&#39;]

## Deny commands matching one of the following regular expressions.
## The filter is applied to the command sent. Full path must be used.
## See {order} parameter for more details how it&#39;s applied together with {allow}.
## With the below default filter only single commands are allowed.
## Defaults: [&#39;(\\||&lt;|&gt;|;|,|\\n|&amp;)&#39;]
#deny = [&#39;(\\||&lt;|&gt;|;|,|\\n|&amp;)&#39;]

## Order: [&#39;allow&#39;,&#39;deny&#39;] or [&#39;deny&#39;,&#39;allow&#39;]. Order of which filter is applied first.
## Defaults: [&#39;allow&#39;,&#39;deny&#39;]
##
## order: [&#39;allow&#39;,&#39;deny&#39;]
## First, all allow directives are evaluated; at least one must match, or the command is rejected.
## Next, all deny directives are evaluated. If any matches, the command is rejected.
## Last, any commands which do not match an allow or a deny directive are denied by default.
## Example:
## allow: [&#39;^/usr/bin/.*&#39;]
## deny: [&#39;^/usr/bin/zip&#39;]
## All commands in /usr/bin except &#39;/usr/bin/zip&#39; can be executed. Full path must be used.
##
## order: [&#39;deny&#39;,&#39;allow&#39;]
## First, all deny directives are evaluated; if any match,
## the command is denied UNLESS it also matches an allow directive.
## Any command which do not match any allow or deny directives are permitted.
## Example:
## deny: [&#39;.*&#39;]
## allow: [&#39;zip$&#39;]
## All commands are denied except those ending in zip.
##
#order = [&#39;allow&#39;,&#39;deny&#39;]

## Limit the maximum length of the command or script output that is sent back.
## Applies to the stdout and stderr separately.
## If exceeded {send_back_limit} bytes are sent.
## Defaults: 4M
#send_back_limit = 4194304
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Examples:</strong></p><p>On Linux only allow commands in <code>/usr/bin</code> and <code>/usr/local/bin</code> and command prefixed with <code>sudo -n</code>.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>allow = [
    &#39;^\\/usr\\/bin\\/.*&#39;,
    &#39;^\\/usr\\/local\\/bin\\/.*&#39;,
    &#39;^sudo -n .*&#39;
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>On Windows try this</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>allow = [
    &#39;^C:\\\\Windows\\\\System32.*&#39;,
    &#39;^C:\\\\Users\\\\Administrator\\\\scripts\\\\.*\\.bat&#39;
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using the above examples requires sending commands with a full path.</p>`,13);function T(E,I){const t=s("ExternalLinkIcon"),u=s("RouterLink");return l(),a("div",null,[v,m,q,e("ul",null,[e("li",null,[e("a",b,[h,i(t)])]),e("li",null,[e("a",p,[f,i(t)])])]),_,e("p",null,[x,i(u,{to:"/docs/no04-client-groups.html"},{default:c(()=>[g]),_:1}),y]),w])}var D=o(r,[["render",T],["__file","no06-command-execution.html.vue"]]);export{D as default};
