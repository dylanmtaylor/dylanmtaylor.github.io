---
layout: post
status: publish
published: false
title: A Reply From Lexmark
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2011-04-22 07:20:19 +0000'
date_gmt: '2011-04-22 07:20:19 +0000'
---
<p>After discovering a bug in <a class="zem_slink" title="Lexmark" rel="homepage" href="http://www.lexmark.com/">Lexmark</a>'s Debian installer, as described in <a href="http://dylanmtaylor.com/2011/04/17/fixing-lexmark-printer-driver-installation-in-ubuntu-11-04/">my previous post</a>, and reporting it to Lexmark's support team, I found a response from Lexmark in my inbox, which was sent on the 18th, and I decided to share it on my blog to show that Lexmark is aware of the issue, and they are actively working on resolving it. Here is the message I received from Lexmark Support:</p>
<blockquote>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<table cellpadding="0">
<tbody>
<tr>
<td>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div id=":10i">
<div>
<div>
<div id=":10k">
<div id=":10j">Dear Dylan,&nbsp;</p>
<p>Here is your Service Request # 1-5145156021</p>
<p>We recently received your feedback.</p>
<p>Thank you for sharing this information. We really appreciate your time and effort in bringing this one to us. I will definitely forward this one to our software engineers so that we can make the necessary changes to our software. We really appreciate your feedback. It's through customers like you that we're able to make improvements in our current and future products.</p>
<p>If you have any more questions or concerns, please contact me at your convenience and I will be happy to assist you. (If I am not available, another representative may reply to your request.)</p>
<p>To respond, please select "Reply" in your e-mail software, and be sure that the past e-mail is included in this reply.</p>
<p>[AOL Users: In order to include the previous e-mail, you must highlight it with your mouse when you are replying.]</p>
<p>If your e-mail client automatically deletes prior e-mail thread information, it will cause a delay while we look up your support history. If this is the case you may want to save the old e-mails as attachments and attach them to the current e-mail.</p>
<p>Sincerely,<br />
Efren<br />
Lexmark eSupport Team<br />
<a href="http://support.lexmark.com/" target="_blank">http://support.lexmark.com</a></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</blockquote>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<table cellpadding="0">
<tbody>
<tr>
<td>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div>
<div id=":10i">
<div>
<div></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div>The driver installation failed because there was a typo in the <a class="zem_slink" title="Lua (programming language)" rel="homepage" href="http://www.lua.org">Lua</a> <a class="zem_slink" title="Source code" rel="wikipedia" href="http://en.wikipedia.org/wiki/Source_code">source code</a> for the <a class="zem_slink" title="Linux" rel="wikipedia" href="http://en.wikipedia.org/wiki/Linux">Linux</a> Lexmark <a class="zem_slink" title="Printer driver" rel="wikipedia" href="http://en.wikipedia.org/wiki/Printer_driver">printer driver</a>. To be specific, the variable "ownership" was misspelled as "ownhership" in one of the lines of the source code. While this is a very easy to fix bug, it prevents the Linux installer from working at all, and I am happy to hear that Lexmark knows about the issue now, and it's likely that a quick fix will be released. Hopefully this will eliminate the need for my workaround, and simplify Linux printer driver installation.</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="border: none; float: right;" src="/images/blog/2011/06/pixy13.gif" alt="" /></div>
