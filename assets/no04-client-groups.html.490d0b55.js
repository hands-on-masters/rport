import{_ as t,r as l,o,c as a,a as e,b as s,e as i,d as u}from"./app.2bd674b4.js";const d={},r=e("h1",{id:"client-groups",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#client-groups","aria-hidden":"true"},"#"),i(" Client Groups")],-1),c=e("p",null,"Rport client group can be created by:",-1),v=e("ol",null,[e("li",null,"adding single clients to it;"),e("li",null,"dynamic criteria using wildcards.")],-1),m=i("Managing client groups is done via the "),p={href:"https://apidoc.rport.io/master/#tag/Client-Groups",target:"_blank",rel:"noopener noreferrer"},q=i("API"),b=i(". The "),g=e("code",null,"/client-groups",-1),h=i(" endpoints allow you to create, update, delete and list them."),x=u(`<p>As listed in the API docs Client Group is defined by:</p><ul><li><p><code>id</code> - unique group identifier</p></li><li><p><code>description</code> - group description</p></li><li><p><code>params</code> - parameters that define what clients belong to a current group. Each parameter can be specified by:</p><ul><li>exact match of the property <strong>(ignoring case)</strong>. For example,<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>params: {
  &quot;client_id&quot;: [&quot;test-win2019-tk01&quot;, &quot;qa-lin-ubuntu16&quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>Means only clients with <code>id</code> equals to <code>test-win2019-tk01</code> or <code>qa-lin-ubuntu16</code> belong to a current group.</li><li>dynamic criteria using wildcards <strong>(ignoring case)</strong>. For example,<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>params: {
  &quot;os_family&quot;: [&quot;linux*&quot;, &quot;*win*&quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>Means all clients with <code>os_family</code> that starts with <code>linux</code> OR that contains <code>win</code> belong to a current group.</li></ul><p>NOTE: if few different parameters are given then a client belongs to this group only if client properties match all the given group parameters. If client parameter has multiple values (like <code>tags</code>, <code>ipv4</code>, <code>ipv6</code>, etc) then he belongs to a group if at least one client param matches one of group parameters. For example,</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  params: {
    &quot;tag&quot;: [&quot;QA&quot;, &quot;my-tag*&quot;],
    &quot;os_family&quot;: [&quot;linux*&quot;, &quot;ubuntu*&quot;]
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Means clients belong to this group only if <strong>both</strong> conditions are met:</p><ol><li>has <code>tag</code> equals to <code>QA</code> <strong>OR</strong> <code>tag</code> that starts with <code>my-tag</code>;</li><li>its <code>os_family</code> starts with <code>linux</code> or <code>ubuntu</code>.</li></ol></li><li><p><code>client_ids</code> - read-only field that is populated with IDs of active clients that belong to this group.</p></li></ul><h2 id="manage-client-groups-via-the-api" tabindex="-1"><a class="header-anchor" href="#manage-client-groups-via-the-api" aria-hidden="true">#</a> Manage client groups via the API</h2><p>Here are some examples how to manage client groups.</p><h3 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> Create</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/client-groups&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;id&quot;: &quot;group-1&quot;,
    &quot;description&quot;: &quot;This is my super client group.&quot;,
    &quot;params&quot;:
    {
        &quot;tag&quot;: [&quot;QA&quot;],
        &quot;os_family&quot;: [&quot;linux*&quot;, &quot;ubuntu*&quot;]
    }
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> Update</h3><p>Note all the parameters will be overridden.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X PUT &#39;http://localhost:3000/api/v1/client-groups/group-1&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;id&quot;: &quot;group-1&quot;,
    &quot;description&quot;: &quot;This is my super client group.&quot;,
    &quot;params&quot;:
    {
        &quot;tag&quot;: [&quot;QA&quot;, &quot;my-tag*&quot;],
        &quot;os_family&quot;: [&quot;linux*&quot;, &quot;ubuntu*&quot;]
    }
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="list-all-client-groups" tabindex="-1"><a class="header-anchor" href="#list-all-client-groups" aria-hidden="true">#</a> List all client groups</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -s -u admin:foobaz http://localhost:3000/api/v1/client-groups/group-1|jq
{
  &quot;data&quot;: {
    &quot;id&quot;: &quot;group-1&quot;,
    &quot;description&quot;: &quot;This is my super client group.&quot;,
    &quot;params&quot;: {
      &quot;client_id&quot;: null,
      &quot;name&quot;: null,
      &quot;os&quot;: null,
      &quot;os_arch&quot;: null,
      &quot;os_family&quot;: [
        &quot;linux*&quot;,
        &quot;ubuntu*&quot;
      ],
      &quot;os_kernel&quot;: null,
      &quot;hostname&quot;: null,
      &quot;ipv4&quot;: null,
      &quot;ipv6&quot;: null,
      &quot;tag&quot;: [
        &quot;QA&quot;,
        &quot;my-tag*&quot;
      ],
      &quot;version&quot;: null,
      &quot;address&quot;: null,
      &quot;client_auth_id&quot;: null
    },
    &quot;client_ids&quot;: [
      &quot;qa-lin-ubuntu16&quot;,
      &quot;qa-lin-ubuntu19&quot;,
      &quot;qa-lin-ubuntu23&quot;
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -u admin:foobaz -X DELETE &#39;http://localhost:3000/api/v1/client-groups/group-1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13);function _(f,y){const n=l("ExternalLinkIcon");return o(),a("div",null,[r,c,v,e("p",null,[m,e("a",p,[q,s(n)]),b,g,h]),x])}var T=t(d,[["render",_],["__file","no04-client-groups.html.vue"]]);export{T as default};
