import{_ as d,r,o,c as l,a as s,b as i,w as t,e,d as u}from"./app.2bd674b4.js";const c={},v=s("h1",{id:"users",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#users","aria-hidden":"true"},"#"),e(" Users")],-1),h=e("Rport users are provided from JSON file or DB as described in "),m=e("authentication section"),p=e("."),b=e("You can manage users with the "),_={href:"https://apidoc.rport.io/master/#tag/Users",target:"_blank",rel:"noopener noreferrer"},g=e("REST API"),q=e("."),f=s("h2",{id:"api-limitations",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#api-limitations","aria-hidden":"true"},"#"),e(" API Limitations")],-1),x=e("Before using the "),w={href:"https://apidoc.rport.io/master/#tag/Users",target:"_blank",rel:"noopener noreferrer"},y=e("User Management API"),A=e(", you should provide at least one user belonging "),U=s("code",null,"Administrators",-1),I=e(" group either in a JSON file or DB."),T=e("If rport is started with static credentials "),P=e("auth mode"),k=e(", user management API won't be usable."),N=e("If rport is started with JSON file credentials, changes to the users list won't be refreshed until rport is restarted since there is a "),B=e("limitation"),E=e("."),L=u(`<h2 id="api-usage" tabindex="-1"><a class="header-anchor" href="#api-usage" aria-hidden="true">#</a> API Usage</h2><p>The <code>/users</code> endpoints allow you to create, update, delete and list users and add or remove users to/from groups.</p><p>As listed in the API docs Users are defined by <code>username</code></p><h3 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> Create</h3><p>Passwords will be hashed automatically before adding them to file or database.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/users&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;username&quot;: &quot;user1&quot;,
    &quot;password&quot;: &quot;123456&quot;
    &quot;groups&quot;:
    [
        &quot;Users&quot;,
        &quot;Administrators&quot;
    ]
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> Update</h3><p>You can provide any parameters that you want to change.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X PUT &#39;http://localhost:3000/api/v1/users/user1&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;password&quot;: &quot;1234567&quot;
    &quot;groups&quot;:
    [
        &quot;Users&quot;
    ]
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This will change password and remove user from Administrators group. To add user to a new group, you should provide all current user groups + a new one e.g.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;groups&quot;:
    [
        &quot;Users&quot;,
        &quot;Administrators&quot;,
        &quot;New Group&quot;
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Please note that all changes to the user affecting credentials will have an immediate effect in most cases disregard if you use JWT or basic password auth (e.g. deletion user from Administrators group), so you should use this API carefully. If you change a password, user will still be able to login with an old JWT token, so the change will work till the next login.</p><h3 id="list-all-users" tabindex="-1"><a class="header-anchor" href="#list-all-users" aria-hidden="true">#</a> List all users</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/users
{
    &quot;data&quot;: [
        {
            &quot;username&quot;: &quot;admin&quot;,
            &quot;groups&quot;: [
                &quot;Administrators&quot;,
                &quot;Users&quot;
            ]
        },
        {
            &quot;username&quot;: &quot;root&quot;,
            &quot;groups&quot;: [
                &quot;Users&quot;
            ]
        }
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Because of security consideration, users list won&#39;t return hashed passwords.</p><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -u admin:foobaz -X DELETE &#39;http://localhost:3000/api/v1/users/user1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,17);function S(C,J){const n=r("RouterLink"),a=r("ExternalLinkIcon");return o(),l("div",null,[v,s("p",null,[h,i(n,{to:"/docs/no03-client-auth.html"},{default:t(()=>[m]),_:1}),p]),s("p",null,[b,s("a",_,[g,i(a)]),q]),f,s("p",null,[x,s("a",w,[y,i(a)]),A,U,I]),s("p",null,[T,i(n,{to:"/docs/no03-client-auth.html#using-a-static-credential"},{default:t(()=>[P]),_:1}),k]),s("p",null,[N,i(n,{to:"/docs/no02-api-auth.html#user-file"},{default:t(()=>[B]),_:1}),E]),L])}var D=d(c,[["render",S],["__file","no12-user.html.vue"]]);export{D as default};
