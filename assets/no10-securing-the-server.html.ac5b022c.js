import{_ as t,r as a,o as s,c as r,a as e,b as l,e as n,d as o}from"./app.2bd674b4.js";const d={},c=e("h1",{id:"securing-the-rport-server",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#securing-the-rport-server","aria-hidden":"true"},"#"),n(" Securing the rport server")],-1),u=e("p",null,"Your rport server usually exposes two TCP ports to the public internet:",-1),v=e("ul",null,[e("li",null,"one for the client connections"),e("li",null,"one for the API and the web frontend")],-1),h=e("p",null,"Both require authentication and unless you use weak passwords you are safe. But even if login attempts are prevented on the HTTP level they produce some load on your server.",-1),b=n("Learn more about the default security measures and how to add a second level of security using "),f={href:"https://www.fail2ban.org/",target:"_blank",rel:"noopener noreferrer"},p=n("fail2ban"),m=n("."),g=o(`<h2 id="client-connection-listener" tabindex="-1"><a class="header-anchor" href="#client-connection-listener" aria-hidden="true">#</a> Client Connection Listener</h2><h3 id="the-client-connection-listener-is-secured-by-default" tabindex="-1"><a class="header-anchor" href="#the-client-connection-listener-is-secured-by-default" aria-hidden="true">#</a> The client connection listener is secured by default</h3><p>By default, the following options are activated for the client connection listener.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>## Protect your server against password guessing.
## Force clients to wait N seconds (float) between unsuccessful login attempts.
## This is per client auth id.
## A message like
##    &#39;client-listener: Failed login attempt for client auth id &quot;abc&quot;, forcing to wait for {client_login_wait}s ({ip})&#39;
## is logged to the info log.
## Consider changing the log_level to &#39;info&#39; to trace failed login attempts.
## Learn more https://oss.rport.io/docs/no10-securing-the-server.html
## Defaults: 2.0
#client_login_wait = 2.0

## After {max_failed_login} consecutive failed login-in attempts ban the source IP address for {ban_time} seconds.
## HTTP Status 423 is returned.
## A message like
##     &#39;Maximum of {max_failed_login} login attempts reached. Visitor ({remote-ip}) banned. Ban expiry: 2021-04-16T11:22:26+00:00&#39;
## is logged to the info log.
## Banning happens on HTTP level.
## Consider banning on network level using fail2ban.
## Learn more https://oss.rport.io/docs/no10-securing-the-server.html
## Defaults: max_failed_login = 5, ban_time = 3600
#max_failed_login = 5
#ban_time = 3600
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>These are good settings to protect your server against password guessing. The counters for failed logins are constantly increasing and only reset by a successful login or a server restart.</p><p>For example, if a client fails to log in for the fifth time, any login attempts of the IP address are blocked for one hour. If there are more clients on the same network with correct credentials but sharing common internet access and these clients are restarted, they are banned too.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>Because rejecting connections on failed logins is handled properly by the server, they are not considered an error and not logged to the log file when you are on the <code>error</code> log level. Consider changing the <code>log_level</code> to <code>info</code> to trace failed logins and to eventually activate fail2ban.</p></div><h3 id="using-fail2ban-for-additional-security" tabindex="-1"><a class="header-anchor" href="#using-fail2ban-for-additional-security" aria-hidden="true">#</a> Using fail2ban for additional security</h3><h4 id="ban-password-guesser" tabindex="-1"><a class="header-anchor" href="#ban-password-guesser" aria-hidden="true">#</a> Ban password guesser</h4><h4 id="ban-scanners" tabindex="-1"><a class="header-anchor" href="#ban-scanners" aria-hidden="true">#</a> Ban scanners</h4><p>After a short period, you will notice HTTP requests to arbitrary files and folders on the client connect port that are answered with HTTP 404. The internet is full of scanners searching for vulnerable web applications. You can safely ban any IP address that produces HTTP 404. A rport client will never do this.</p><p>Search your log file for the following pattern: <code>egrep &quot; 404 [0-9]+\\w+ \\(.*\\)&quot; /var/log/rport/rportd.log</code></p><h4 id="fail2ban-configuration" tabindex="-1"><a class="header-anchor" href="#fail2ban-configuration" aria-hidden="true">#</a> Fail2ban configuration</h4><div class="custom-container tip"><p class="custom-container-title">Remember</p><p>All fail2ban rules require running rport with <code>log_level = &#39;info&#39;</code>.</p></div><p>To create rules and filters to ban both, password guessers and scanners, proceed with the following setup.</p><p>A fail2ban filter <code>/etc/fail2ban/filter.d/rportd-client-connect.conf</code> can look like this.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># Fail2Ban filter for rportd client connect
[Definition]
# Identify scanners
failregex = 404 [0-9]+\\w+ \\(&lt;HOST&gt;\\)
# Identify password guesser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Test the definition with <code>fail2ban-regex /var/log/rport/rportd.log /etc/fail2ban/filter.d/rport-client-connect.conf</code> It should output something like</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Lines: 16900 lines, 0 ignored, 755 matched, 16145 missed
[processed in 1.04 sec]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>That means fail2ban has found 755 requests that will be banned.</p><p>Create a ban action in <code>/etc/fail2ban/jail.d/rportd-client-connect.conf</code>. Change <code>port</code> to the port your rportd is listening for client connections. <code>grep &quot;url =&quot; /etc/rport/rportd.conf </code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># service name
[rportd-client-connect]
# turn on /off
enabled  = true
# ports to ban (numeric or text)
port     = 8080
# filter from previous step
filter   = rportd-client-connect
# file to parse
logpath  = /var/log/rport/rportd.log
# ban rule:
# ban all IPs that have created two 404 request during the last 20 seconds for 1hour
maxretry = 2
findtime = 20
# ban on 10 minutes
bantime = 3600
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Restart fail2ban to activate the new configuration with <code>service fail2ban restart</code> and check the status.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@localhost:~# fail2ban-client status
Status
|- Number of jail:	2
\`- Jail list:	rportd-client-connect, sshd
fail2ban-server[1905]: Server ready
root@localhost:~# fail2ban-client status
Status
|- Number of jail:	2
\`- Jail list:	rportd-client-connect, sshd
root@localhost:~# fail2ban-client status rportd-client-connect
Status for the jail: rportd-client-connect
|- Filter
|  |- Currently failed:	0
|  |- Total failed:	0
|  \`- File list:	/var/log/rport/rportd.log
\`- Actions
   |- Currently banned:	0
   |- Total banned:	0
   \`- Banned IP list:	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>Fail2ban ships with a lot of default rules and the SSH is enabled by default. To enable fail2ban only for rportd and to disable the ssh rule, make sure only rportd rules are in <code>/etc/fail2ban/jail.d/</code>. Either delete <code>/etc/fail2ban/jail.d/defaults-debian.conf</code> or open the file and comment out all lines. Use <code>fail2ban-client status</code> to verify which rules are active.</p></div><h2 id="securing-the-api" tabindex="-1"><a class="header-anchor" href="#securing-the-api" aria-hidden="true">#</a> Securing the API</h2><p>@todo: Finish this chapter.</p>`,27);function _(x,w){const i=a("ExternalLinkIcon");return s(),r("div",null,[c,u,v,h,e("p",null,[b,e("a",f,[p,l(i)]),m]),g])}var T=t(d,[["render",_],["__file","no10-securing-the-server.html.vue"]]);export{T as default};
