import{_ as e,o as i,c as n,d as t}from"./app.2bd674b4.js";const s={},r=t(`<h1 id="multi-tenancy" tabindex="-1"><a class="header-anchor" href="#multi-tenancy" aria-hidden="true">#</a> Multi tenancy</h1><p>Multi tenancy can be achieved by running multiple isolated instances of the RPort server on a single host. By invoking <code>rportd</code> multiple time with different configuration files, you get completely isolated server instances.</p><h2 id="run-it-with-systemd" tabindex="-1"><a class="header-anchor" href="#run-it-with-systemd" aria-hidden="true">#</a> Run it with systemd</h2><p>Below you find an example of systemd service file, that manages multiple instances. Store the file in <code>/etc/systemd/system/rportd@.service</code>. (The <code>@</code> sign in the file name is crucial.)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[Unit]
Description=Rport Server Instance %i
ConditionFileIsExecutable=/usr/local/bin/rportd

[Service]
StartLimitInterval=5
StartLimitBurst=10
ExecStart=/usr/local/bin/rportd &quot;-c&quot; &quot;/etc/rport/instances/rportd.%i.conf&quot;
LimitNOFILE=1048576
User=rport
Restart=always
RestartSec=120
EnvironmentFile=-/etc/sysconfig/rportd

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now create a folder <code>/etc/rport/instances/</code> and put a configuration file per instance in this folder. Start and stop the instances with <code>systemctl start rportd@&lt;INSTANCE-NAME&gt;</code>.</p>`,6),a=[r];function d(l,c){return i(),n("div",null,a)}var u=e(s,[["render",d],["__file","no11-multi-tenancy.html.vue"]]);export{u as default};
