import{_ as l,r as a,o as d,c as r,a as n,b as t,w as s,d as u,e}from"./app.2bd674b4.js";const c={},v=u(`<h1 id="on-demand-tunnels-using-the-api" tabindex="-1"><a class="header-anchor" href="#on-demand-tunnels-using-the-api" aria-hidden="true">#</a> On-demand tunnels using the API</h1><p>Initializing the creation of a tunnel from the client is nice but not a perfect solution for secure and reliable remote access to a large number of machines. Most of the time the tunnel wouldn&#39;t be used. Network resources would be wasted and a port is exposed to the internet for an unnecessarily long time. Rport provides the option to establish tunnels from the server only when you need them.</p><h2 id="activate-the-api" tabindex="-1"><a class="header-anchor" href="#activate-the-api" aria-hidden="true">#</a> Activate the API</h2><p>Using the provided <code>rportd.example.conf</code> the internal management API is enabled by default listening on http://localhost:3000.</p><p>Set up <code>[api]</code> config params. For example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># specify non-empty api.address to enable API support
[api]
  # Defines the IP address and port the API server listens on
  address = &quot;127.0.0.1:3000&quot;
  # Defines &lt;user:password&gt; authentication pair for accessing API
  auth = &quot;admin:foobaz&quot;
  jwt_secret = &quot;quei1too2Jae3xootu&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),q=e('This opens the API and enables HTTP basic authentication with a single user "admin:foobaz" who has access to the API. Restart the rportd after any changes to the configuration. Read more about API '),m=e("authentication options"),h=e("."),p=n("div",{class:"custom-container danger"},[n("p",{class:"custom-container-title"},"DANGER"),n("p",null,[e("Do not run the API on public servers with the default credentials. Change the "),n("code",null,"auth="),e(" settings and generate your own "),n("code",null,"jwt_secret"),e(", e.g. by using the command "),n("code",null,"pwgen 24 1"),e(" or "),n("code",null,"openssl rand -hex 12"),e(".")])],-1),b={class:"custom-container tip"},_=n("p",{class:"custom-container-title"},"TIP",-1),g=e("If you expose your API to the public internet, it's highly recommended to enable HTTPS. Read the "),f=e("quick HTTPS howto"),x=e("."),y=n("p",null,[e("By default the built-in web server can run the API only on ports above 1024. To circumvent this limit refer to "),n("a",{href:"#running-the-api-on-a-privileged-port"},"running the API on privileged ports.")],-1),I=n("p",null,[e("Test if you set up the API properly by querying its status with "),n("code",null,"curl -s -u admin:foobaz http://localhost:3000/api/v1/status"),e(".")],-1),w={class:"custom-container tip"},P=n("p",{class:"custom-container-title"},"TIP",-1),T=e("The API always returns a minified json formatted response. The large output is hard to read. In all further examples, we use the command-line tool "),A={href:"https://stedolan.github.io/jq/",target:"_blank",rel:"noopener noreferrer"},R=e("jq"),k=e(" to reformat the json with line breaks and indentation for better readability. "),z=n("code",null,"jq",-1),C=e("is included in almost any distribution, for Windows you can download it "),L={href:"https://stedolan.github.io/jq/download/",target:"_blank",rel:"noopener noreferrer"},N=e("here"),E=e("."),U=u(`<p>Example of a human-readable API status</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>~# curl -s -u admin:foobaz http://localhost:3000/api/v1/status |jq
{
  &quot;data&quot;: {
    &quot;connect_url&quot;: [&quot;http://0.0.0.0:8080&quot;],
    &quot;fingerprint&quot;: &quot;2a:c8:79:09:80:ba:7c:60:05:e5:2c:99:6d:75:56:24&quot;,
    &quot;clients_connected&quot;: 3,
    &quot;clients_disconnected&quot;: 1,
    &quot;version&quot;: &quot;0.1.28&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="connect-a-client-without-a-tunnel" tabindex="-1"><a class="header-anchor" href="#connect-a-client-without-a-tunnel" aria-hidden="true">#</a> Connect a client without a tunnel</h2><p>Invoke the rport client without specifying a tunnel but with some extra data.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rport --id my-client-1 \\
  --fingerprint &lt;YOUR_FINGERPRINT&gt; \\
  --tag Linux --tag &quot;Office Berlin&quot; \\
  --name &quot;My Test VM&quot; --auth user1:1234 \\
  node1.example.com:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Add auth and fingerprint as already explained.</em></p><p>This attaches the client to the message queue of the server without creating a tunnel.</p><h2 id="manage-clients-and-tunnels-through-the-api" tabindex="-1"><a class="header-anchor" href="#manage-clients-and-tunnels-through-the-api" aria-hidden="true">#</a> Manage clients and tunnels through the API</h2><p>On the server, you can supervise the attached clients using <code>curl -s -u admin:foobaz http://localhost:3000/api/v1/clients</code>. Here is an example:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/clients|jq
[
  {
    &quot;id&quot;: &quot;my-client-1&quot;,
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
    &quot;os_full_name&quot;: &quot;Alpine Linux&quot;,
    &quot;os_version&quot;: &quot;4.19.80-0&quot;,
    &quot;os_virtualization_system&quot;:&quot;&quot;,
    &quot;os_virtualization_role&quot;:&quot;&quot;,
    &quot;cpu_family&quot;:&quot;6&quot;,
    &quot;cpu_model&quot;:&quot;79&quot;,
    &quot;cpu_model_name&quot;:&quot;Intel(R) Xeon(R) CPU E5-2630 v4 @ 2.20GHz&quot;,
    &quot;cpu_vendor&quot;:&quot;Intel&quot;,
    &quot;num_cpus&quot;:4,
    &quot;mem_total&quot;:8363900928,
    &quot;timezone&quot;:&quot;CEST (UTC+02:00)&quot;,
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),j=e("There is one client connected with an active tunnel. The second client is in standby mode. Read more about the "),M=e("management of tunnel via the API"),S=e(" or read the "),B={href:"https://apidoc.rport.io/master/",target:"_blank",rel:"noopener noreferrer"},D=e("API docs"),V=e("."),O=u(`<h2 id="running-the-api-on-a-privileged-port" tabindex="-1"><a class="header-anchor" href="#running-the-api-on-a-privileged-port" aria-hidden="true">#</a> Running the API on a privileged port</h2><p>For security reasons the rport server runs as an unprivileged user and you should not change this. But unprivileged users are not allowed to open port below 1024. Instead of changing user privileges you can change the capabilities of the rportd binary and allow it to use any port even when not running as root.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/rportd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>That&#39;s all. Now you can use &quot;0.0.0.0:443&quot; as API address.</p><p>You need to run the above command everytime you change the rpotd binary, for example after every update.</p>`,5);function H(G,F){const i=a("RouterLink"),o=a("ExternalLinkIcon");return d(),r("div",null,[v,n("p",null,[q,t(i,{to:"/docs/no02-api-auth.html"},{default:s(()=>[m]),_:1}),h]),p,n("div",b,[_,n("p",null,[g,t(i,{to:"/docs/no08-https-howto.html"},{default:s(()=>[f]),_:1}),x])]),y,I,n("div",w,[P,n("p",null,[T,n("a",A,[R,t(o)]),k,z,C,n("a",L,[N,t(o)]),E])]),U,n("p",null,[j,t(i,{to:"/docs/no09-managing-tunnels.html"},{default:s(()=>[M]),_:1}),S,n("a",B,[D,t(o)]),V]),O])}var W=l(c,[["render",H],["__file","no01-on-demand-tunnels.html.vue"]]);export{W as default};
