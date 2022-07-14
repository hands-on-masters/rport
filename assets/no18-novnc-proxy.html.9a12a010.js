import{_ as e,o as t,c as r,d as o}from"./app.2bd674b4.js";const i={},n=o(`<h1 id="novnc-proxy" tabindex="-1"><a class="header-anchor" href="#novnc-proxy" aria-hidden="true">#</a> noVNC-Proxy</h1><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>Starting with version 0.5.10 RPort has the ability to create a tunnel to a remote VNC server with a built-in VNC-to-HTTPS proxy. The rport server exposes the &quot;vnc signal&quot; on an encrypted HTTPS port instead of using the unencrypted VNC protocol. If a vnc tunnel with proxy is created, rport first creates the tunnel to the remote machine, makes the remote VNC port available only on localhost and spawns a vnc proxy that makes the VNC signal accessible over HTTPS on the proxy port with path &quot;/&quot;. Pointing the browser to this URL loads the novnc javascript app and the session starts.</p><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2><ul><li>noVNC javascript app has to be available on local filesystem</li><li>RPort server configuration <code>novnc_root</code> must point to the noVNC javascript app directory</li><li>RPort server configuration <code>tunnel_proxy_cert_file</code> and <code>tunnel_proxy_key_file</code> must be set up. NoVNC depends on the generic built-in TLS reverse proxy, which is enabled by providing a key and a certificate.</li></ul><h2 id="install-novnc-javascript-app" tabindex="-1"><a class="header-anchor" href="#install-novnc-javascript-app" aria-hidden="true">#</a> Install noVNC javascript app</h2><p>Rport is tested with noVNC v1.3.0.zip, so this version is recommended.</p><ul><li>Download noVNC from github https://github.com/novnc/noVNC/archive/refs/tags/v1.3.0.zip</li><li>Extract the content of the zip file to a local directory e.g. &quot;/home/{user}/rportd/noVNC-1.3.0&quot;</li></ul><p>If your rport server runs with the suggested default settings, the NoVNC can be downloaded as follows.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>cd /tmp
curl -LO https://github.com/novnc/noVNC/archive/refs/tags/v1.3.0.zip
unzip -d /var/lib/rport v1.3.0.zip
rm -f v1.3.0.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You will then have all needed files in <code>/var/lib/rport/noVNC-1.3.0</code>.</p><h2 id="server-configuration" tabindex="-1"><a class="header-anchor" href="#server-configuration" aria-hidden="true">#</a> Server configuration</h2><p>Provide a value for <code>novnc_root</code> in the <code>[server]</code> section of the <code>rportd.conf</code>. It has to be the directory where the noVNC javascript app is located e.g.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[server]
 ...snip ...snap
 ## If specified, rportd will serve novnc javascript app from this directory.
 novnc_root = &quot;/var/lib/rport/noVNC-1.3.0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),a=[n];function s(c,d){return t(),r("div",null,a)}var p=e(i,[["render",s],["__file","no18-novnc-proxy.html.vue"]]);export{p as default};
