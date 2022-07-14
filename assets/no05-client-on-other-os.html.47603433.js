import{_ as r,r as s,o as l,c as a,a as e,b as d,d as n,e as t}from"./app.2bd674b4.js";const o={},c=n(`<h1 id="install-and-run-a-rport-client" tabindex="-1"><a class="header-anchor" href="#install-and-run-a-rport-client" aria-hidden="true">#</a> Install and run a rport client</h1><h2 id="on-mac-os-intel-based" tabindex="-1"><a class="header-anchor" href="#on-mac-os-intel-based" aria-hidden="true">#</a> On Mac OS (intel based)</h2><p>Open the terminal and as an unprivileged user download the binary and put it in <code>/usr/local/bin</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -LOJ &#39;https://downloads.rport.io/rport/stable/latest.php?arch=Darwin_x86_64&#39;
test -e /usr/local/bin/||sudo mkdir /usr/local/bin
sudo tar xzf rport_*_Darwin_x86_64.tar.gz -C /usr/local/bin/ rport
sudo mkdir /etc/rport
tar xzf rport_*_Darwin_x86_64.tar.gz rport.example.conf
sudo mv rport.example.conf /etc/rport/rport.conf
sudo mkdir /var/log/rport
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now open the configuration file with an editor and enter your server URL, credentials, and fingerprint.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo vim /etc/rport/rport.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Before registering a service, test it with <code>rport -c /etc/rport/rport.conf</code>. You should not get any output and the new client should appear on the server.</p><p>For registering the service you have two options.</p>`,8),u=e("li",null,"You run it with your own user.",-1),v=t("You create a so-called daemon user on Mac OS "),p={href:"https://gist.github.com/mwf/20cbb260ad2490d7faaa",target:"_blank",rel:"noopener noreferrer"},g=t("following this guide"),m=t("."),b=n(`<p>Register and run the service.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo rport --service install --service-user &lt;USERNAME&gt; -c /etc/rport/rport.conf
sudo rport --service start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>If you are in doubt the service has been created run <code>sudo launchctl list|grep rport</code>. It should list the pid on the first column to indicate rport is running.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo launchctl list|grep &quot;rport$&quot;
9942	0	rport
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>If you get an output like this, the installation of the service has succeeded but rport cannot start.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo launchctl list|grep &quot;rport$&quot;
-	0	rport
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Missing write permissions to the folder <code>/usr/local/var/log/</code> are most likely the reason. Open <code>/Library/LaunchDaemons/rport.plist</code> with an editor and use <code>tmp</code> as log directory for the start-up logs.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;?&gt;
&lt;!DOCTYPE plist PUBLIC &quot;-//Apple Computer//DTD PLIST 1.0//EN&quot;
&quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot; &gt;
&lt;plist version=&#39;1.0&#39;&gt;
  &lt;dict&gt;
    &lt;key&gt;Label&lt;/key&gt;
    &lt;string&gt;rport&lt;/string&gt;
    &lt;key&gt;ProgramArguments&lt;/key&gt;
    &lt;array&gt;
      &lt;string&gt;/usr/local/bin/rport&lt;/string&gt;

      &lt;string&gt;-c&lt;/string&gt;

      &lt;string&gt;/etc/rport/rport.conf&lt;/string&gt;

    &lt;/array&gt;
    &lt;key&gt;UserName&lt;/key&gt;
    &lt;string&gt;hero&lt;/string&gt;


    &lt;key&gt;SessionCreate&lt;/key&gt;
    &lt;true/&gt;
    &lt;key&gt;KeepAlive&lt;/key&gt;
    &lt;true/&gt;
    &lt;key&gt;RunAtLoad&lt;/key&gt;
    &lt;false/&gt;
    &lt;key&gt;Disabled&lt;/key&gt;
    &lt;false/&gt;

    &lt;key&gt;StandardOutPath&lt;/key&gt;
    &lt;string&gt;/tmp/rport.out.log&lt;/string&gt;
    &lt;key&gt;StandardErrorPath&lt;/key&gt;
    &lt;string&gt;/tmp/rport.err.log&lt;/string&gt;

  &lt;/dict&gt;
&lt;/plist&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now reload the service definition and check if rport starts.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo launchctl unload /Library/LaunchDaemons/rport.plist
sudo launchctl load /Library/LaunchDaemons/rport.plist
sudo launchctl start rport
sudo launchctl list|grep &quot;rport$&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>By default, rport starts at boot.</p><h2 id="on-mac-os-m1-arm-based" tabindex="-1"><a class="header-anchor" href="#on-mac-os-m1-arm-based" aria-hidden="true">#</a> On Mac OS (M1/Arm based)</h2><p>Coming soon.</p><h2 id="on-openwrt" tabindex="-1"><a class="header-anchor" href="#on-openwrt" aria-hidden="true">#</a> On OpenWRT</h2><p>Coming soon.</p>`,15);function h(x,f){const i=s("ExternalLinkIcon");return l(),a("div",null,[c,e("ol",null,[u,e("li",null,[v,e("a",p,[g,d(i)]),m])]),b])}var y=r(o,[["render",h],["__file","no05-client-on-other-os.html.vue"]]);export{y as default};
