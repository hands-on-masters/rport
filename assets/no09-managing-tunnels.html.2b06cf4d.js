import{_ as i,r as o,o as l,c as u,a as n,b as a,d as t,e}from"./app.2bd674b4.js";const r={},d=t(`<h1 id="managing-tunnels" tabindex="-1"><a class="header-anchor" href="#managing-tunnels" aria-hidden="true">#</a> Managing tunnels</h1><h2 id="manage-tunnel-client-side" tabindex="-1"><a class="header-anchor" href="#manage-tunnel-client-side" aria-hidden="true">#</a> Manage tunnel client-side</h2><p>Specify the desired tunnel on the command line, for example</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rport --auth rport:password123 &lt;SERVER_IP&gt;:9999 2222:22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Alternatively add tunnels to the configuration file <code>rport.conf</code>.</p><h2 id="manage-tunnel-server-side" tabindex="-1"><a class="header-anchor" href="#manage-tunnel-server-side" aria-hidden="true">#</a> Manage tunnel server-side</h2>`,6),c=e("On the server, you can supervise and manage the attached clients through the "),p={href:"https://apidoc.rport.io/master/#tag/Clients-and-Tunnels",target:"_blank",rel:"noopener noreferrer"},v=e("API"),m=e("."),q=t(`<h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><p><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/clients</code>. <em>Use <code>jq</code> for pretty-printing json.</em> Here is an example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/clients|jq
[
  {
    &quot;id&quot;: &quot;2ba9174e-640e-4694-ad35-34a2d6f3986b&quot;,
    &quot;name&quot;: &quot;My Test VM&quot;,
    &quot;os&quot;: &quot;Linux my-devvm-v3 5.4.0-37-generic #41-Ubuntu SMP Wed Jun 3 18:57:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux&quot;,
    &quot;os_arch&quot;: &quot;amd64&quot;,
    &quot;os_family&quot;: &quot;debian&quot;,
    &quot;os_kernel&quot;: &quot;linux&quot;,
    &quot;os_full_name&quot;: &quot;Debian&quot;,
    &quot;os_version&quot;: &quot;5.4.0-37&quot;,
    &quot;os_virtualization_system&quot;:&quot;KVM&quot;,
    &quot;os_virtualization_role&quot;:&quot;guest&quot;,
    &quot;cpu_family&quot;:&quot;59&quot;,
    &quot;cpu_model&quot;:&quot;6&quot;,
    &quot;cpu_model_name&quot;:&quot;Intel(R) Xeon(R) Silver 4110 CPU @ 2.10GHz&quot;,
    &quot;cpu_vendor&quot;:&quot;Intel&quot;,
    &quot;num_cpus&quot;:16,
    &quot;mem_total&quot;:67020316672,
    &quot;timezone&quot;:&quot;UTC (UTC+00:00)&quot;,
    &quot;hostname&quot;: &quot;my-devvm-v3&quot;,
    &quot;ipv4&quot;: [
      &quot;192.168.3.148&quot;
    ],
    &quot;ipv6&quot;: [
      &quot;fe80::20c:29ff:fec8:b1f&quot;
    ],
    &quot;tags&quot;: [
      &quot;Linux&quot;,
      &quot;Office Berlin&quot;
    ],
    &quot;version&quot;: &quot;0.1.6&quot;,
    &quot;address&quot;: &quot;87.123.136.***:63552&quot;,
    &quot;tunnels&quot;: []
  },
   {
    &quot;id&quot;: &quot;aa1210c7-1899-491e-8e71-564cacaf1df8&quot;,
    &quot;name&quot;: &quot;Random Rport Client&quot;,
    &quot;os&quot;: &quot;Linux alpine-3-10-tk-01 4.19.80-0-virt #1-Alpine SMP Fri Oct 18 11:51:24 UTC 2019 x86_64 Linux&quot;,
    &quot;os_arch&quot;: &quot;amd64&quot;,
    &quot;os_family&quot;: &quot;alpine&quot;,
    &quot;os_kernel&quot;: &quot;linux&quot;,
    &quot;os_full_name&quot;: &quot;Debian&quot;,
    &quot;os_version&quot;: &quot;5.4.0-37&quot;,
    &quot;os_virtualization_system&quot;:&quot;KVM&quot;,
    &quot;os_virtualization_role&quot;:&quot;guest&quot;,
    &quot;cpu_family&quot;:&quot;59&quot;,
    &quot;cpu_model&quot;:&quot;6&quot;,
    &quot;cpu_model_name&quot;:&quot;Intel(R) Xeon(R) Silver 4110 CPU @ 2.10GHz&quot;,
    &quot;cpu_vendor&quot;:&quot;Intel&quot;,
    &quot;num_cpus&quot;:16,
    &quot;mem_total&quot;:67020316672,
    &quot;timezone&quot;:&quot;UTC (UTC+00:00)&quot;,
    &quot;hostname&quot;: &quot;alpine-3-10-tk-01&quot;,
    &quot;ipv4&quot;: [
      &quot;192.168.122.117&quot;
    ],
    &quot;ipv6&quot;: [
      &quot;fe80::b84f:aff:fe59:a0ba&quot;
    ],
    &quot;tags&quot;: [
      &quot;Linux&quot;,
      &quot;Datacenter 1&quot;
    ],
    &quot;version&quot;: &quot;0.1.6&quot;,
    &quot;address&quot;: &quot;88.198.189.***:43206&quot;,
    &quot;tunnels&quot;: [
      {
        &quot;lhost&quot;: &quot;0.0.0.0&quot;,
        &quot;lport&quot;: &quot;2222&quot;,
        &quot;rhost&quot;: &quot;0.0.0.0&quot;,
        &quot;rport&quot;: &quot;22&quot;,
        &quot;id&quot;: &quot;1&quot;
      }
    ]
  }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above example shows one client connected with an active tunnel. The second client is in standby mode.</p><h3 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> Create</h3><p>Now use <code>PUT /api/v1/clients/{id}/tunnels?local={port}&amp;remote={port}</code> to request a new tunnel for a client. For example,</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=2ba9174e-640e-4694-ad35-34a2d6f3986b
LOCAL_PORT=4000
REMOTE_PORT=22
curl -u admin:foobaz -X PUT &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels?local=$LOCAL_PORT&amp;remote=$REMOTE_PORT&quot;|jq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The ports are defined from the servers&#39; perspective. &quot;Local&quot; refers to the local ports of the rport server. &quot;Remote&quot; refers to the ports and interfaces of the client. The above example opens port 4000 on the rport server and forwards to the port 22 of the client.</p><p>Using</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz -X GET &quot;http://localhost:3000/api/v1/clients&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>or</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz -X GET &quot;http://localhost:3000/api/v1/clients&quot;|jq &quot;.data[] | select(.id==\\&quot;$CLIENTID\\&quot;)|.tunnels&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>confirms the tunnel has been established.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;tunnels&quot;: [
      {
        &quot;lhost&quot;: &quot;0.0.0.0&quot;,
        &quot;lport&quot;: &quot;4000&quot;,
        &quot;rhost&quot;: &quot;0.0.0.0&quot;,
        &quot;rport&quot;: &quot;22&quot;,
        &quot;id&quot;: &quot;1&quot;
      }
    ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above example makes the tunnel available without restrictions. Learn more about access control (ACL) below.</p><p>If you omit the local port a random free port on the rport server is selected. For example,</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz -X PUT &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels?remote=22&quot;|jq
{
  &quot;data&quot;: {
    &quot;success&quot;: 1,
    &quot;tunnel&quot;: {
      &quot;lhost&quot;: &quot;0.0.0.0&quot;,
      &quot;lport&quot;: &quot;38126&quot;,
      &quot;rhost&quot;: &quot;0.0.0.0&quot;,
      &quot;rport&quot;: &quot;22&quot;,
      &quot;lport_random&quot;: true,
      &quot;id&quot;: &quot;4&quot;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The rport client is not limited to establish tunnels only to the system it runs on. You can use it as a jump host to create tunnels to foreign systems too.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=2ba9174e-640e-4694-ad35-34a2d6f3986b
LOCAL_PORT=4001
REMOTE_PORT=192.168.178.1:80
curl -u admin:foobaz -X PUT &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels?local=$LOCAL_PORT&amp;remote=$REMOTE_PORT&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This example forwards port 4001 of the rport server to port 80 of <code>192.168.178.1</code> using the rport client in the middle.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;tunnels&quot;: [
      {
        &quot;lhost&quot;: &quot;0.0.0.0&quot;,
        &quot;lport&quot;: &quot;4001&quot;,
        &quot;rhost&quot;: &quot;192.168.178.1&quot;,
        &quot;rport&quot;: &quot;80&quot;,
        &quot;id&quot;: &quot;1&quot;
      }
    ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Idle tunnels are automatically closed after 5 minutes. You can change <code>idle-timeout-minutes</code> parameter to provide a custom value in minutes.</p><p>For example,</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=2ba9174e-640e-4694-ad35-34a2d6f3986b
LOCAL_PORT=4000
REMOTE_PORT=22
curl -u admin:foobaz -X PUT &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels?local=$LOCAL_PORT&amp;remote=$REMOTE_PORT&amp;idle-timeout-minutes=10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If no <code>idle-timeout-minutes</code> parameter is given, the default idle timeout will be 5 minutes. To disable auto-closing of tunnels, you should provide <code>skip-idle-timeout</code> parameter, e.g.:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=2ba9174e-640e-4694-ad35-34a2d6f3986b
LOCAL_PORT=4000
REMOTE_PORT=22
curl -u admin:foobaz -X PUT &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels?local=$LOCAL_PORT&amp;remote=$REMOTE_PORT&amp;skip-idle-timeout=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Please note, that you should not use <code>skip-idle-timeout</code> and <code>idle-timeout-minutes</code> in the same request, what will cause a conflicting parameter error.</p><h4 id="tunnel-access-control" tabindex="-1"><a class="header-anchor" href="#tunnel-access-control" aria-hidden="true">#</a> Tunnel access control</h4><p>To increase the security of remote access, you can control how it is allowed to use a tunnel by limiting the tunnel usage to ip v4 addresses or network segments (ipv6 is not supported yet).</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=2ba9174e-640e-4694-ad35-34a2d6f3986b
LOCAL_PORT=4000
REMOTE_PORT=22
ACL=213.90.90.123,189.20.90.0/24
curl -u admin:foobaz -X PUT &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels?local=$LOCAL_PORT&amp;remote=$REMOTE_PORT&amp;acl=$ACL&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>A list of single ip-addresses or network segments separated by a comma is accepted.</p><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><p>Using a DELETE request with the tunnel id allows terminating a tunnel.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CLIENTID=2ba9174e-640e-4694-ad35-34a2d6f3986b
TUNNELID=1
curl -u admin:foobaz -X DELETE &quot;http://localhost:3000/api/v1/clients/$CLIENTID/tunnels/$TUNNELID&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reverse-proxy-for-http-s-based-tunnels" tabindex="-1"><a class="header-anchor" href="#reverse-proxy-for-http-s-based-tunnels" aria-hidden="true">#</a> Reverse proxy for http(s) based tunnels</h2><p>Starting with RPort version 0.5 the server comes with a built-in http reverse proxy. The reverse proxy runs on top of tunnels pointing to remote http or https backend.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>       Browser (you)
           \u1401
Reverse proxy on RPort server
           \u1401
     Tunnel endpoint
           \u1401
         Tunnel
           \u1401
      Rport client
           \u1401
         Target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using the reverse tunnel allows you to access remote web servers (web-based configuration of switches, routers, NAS) through a secure https communication with valid ssl certificates on the public side.</p><p>To enable this feature the rport server needs a key and a certificate in the <code>[server]</code> section of the <code>rportd.conf</code> file. If you run the server and API on the same DNS hostname, you can use the same key and certificate for the server and the API.</p><p>Running the built-in http proxy without encryption is not supported.</p><p>If you have upgraded your RPort server from an older version, insert the following lines into the <code>[server]</code> section of <code>rportd.conf</code> manually.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  ## Enable the creation of tunnel proxies with giving certificate- and key-file
  ## Defaults: not enabled
  #tunnel_proxy_cert_file = &quot;/var/lib/rport/server.crt&quot;
  #tunnel_proxy_key_file = &quot;/var/lib/rport/server.key&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42),b=e("By using "),h=n("code",null,"http_proxy=1",-1),g=e(" on "),f={href:"https://apidoc.rport.io/master/#operation/ClientTunnelsPut",target:"_blank",rel:"noopener noreferrer"},x=e("tunnel creation"),_=e(", the proxy will come up together with the tunnel. The rport server will then use two tcp ports. One for the raw tcp tunnel and one for the http proxy. ACLs are applied to proxy also. The raw tcp tunnel is bound to localhost only, and therefore it's not accessible from the outside."),k=t(`<div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>If you want to use the built-in tunnel proxy, accessing your rport server via an FQDN \u2013 and not via IP address \u2013 is mandatory. Otherwise, you will always get warnings about invalid SSL certificates.</p></div><h3 id="manipulating-the-host-header" tabindex="-1"><a class="header-anchor" href="#manipulating-the-host-header" aria-hidden="true">#</a> Manipulating the host header</h3><p>The http header <code>host</code> is taken from the client request and passed without modification to the backend (remote target). If you use your browser for accessing the tunnel proxy, the host is usually set to the FQDN of your rport server. If the remote side requires a specific header <code>host</code> to jump into the right virtual host, you can specify a host header that the will be used for the proxy connection. For example <code>http_proxy=1&amp;host_header=www.example.com</code>.</p><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -s -X PUT -G <span class="token string">&quot;<span class="token variable">\${RPORT-SERVER}</span>/api/v1/clients/<span class="token variable">\${CLIENT_ID}</span>/tunnels&quot;</span>  <span class="token punctuation">\\</span>
 -d <span class="token assign-left variable">remote</span><span class="token operator">=</span><span class="token number">192.168</span>.249.1:443 <span class="token punctuation">\\</span>
 -d <span class="token assign-left variable">scheme</span><span class="token operator">=</span>https <span class="token punctuation">\\</span>
 -d <span class="token assign-left variable">acl</span><span class="token operator">=</span><span class="token number">87.79</span>.148.181 <span class="token punctuation">\\</span>
 -d idle-timeout-minutes<span class="token operator">=</span><span class="token number">5</span> <span class="token punctuation">\\</span>
 -d <span class="token assign-left variable">check_port</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
 -d <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
 -d <span class="token assign-left variable">host_header</span><span class="token operator">=</span>fritz.box <span class="token punctuation">\\</span>
 -H <span class="token string">&quot;Authorization: Bearer <span class="token variable">$TOKEN</span>&quot;</span> <span class="token punctuation">\\</span>
 -H <span class="token string">&#39;accept: application/json&#39;</span> <span class="token punctuation">\\</span>
 -H <span class="token string">&#39;Content-Type: application/json&#39;</span><span class="token operator">|</span>jq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>The <code>-G</code> switch of curl takes all <code>-d</code> key-value-pairs and appends them to the URL concatenaited by an ampersand.</em></p><p>In the example, the client creates a bridge to the https web-interface of a router and a reverse proxy will be started automatically. You will get a response like this:</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
 <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token property">&quot;lhost&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;lport&quot;</span><span class="token operator">:</span> <span class="token string">&quot;21504&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;rhost&quot;</span><span class="token operator">:</span> <span class="token string">&quot;192.168.249.1&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;rport&quot;</span><span class="token operator">:</span> <span class="token string">&quot;443&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;lport_random&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token property">&quot;scheme&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;acl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;87.79.148.181&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;idle_timeout_minutes&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
   <span class="token property">&quot;http_proxy&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now you can point you browser to <code>https://{RPORT-SERVER}:21504</code> to access the web server on the remote side.</p>`,9);function T(y,E){const s=o("ExternalLinkIcon");return l(),u("div",null,[d,n("p",null,[c,n("a",p,[v,a(s)]),m]),q,n("p",null,[b,h,g,n("a",f,[x,a(s)]),_]),k])}var R=i(r,[["render",T],["__file","no09-managing-tunnels.html.vue"]]);export{R as default};
