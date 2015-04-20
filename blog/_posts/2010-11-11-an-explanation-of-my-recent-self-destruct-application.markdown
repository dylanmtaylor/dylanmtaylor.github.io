---
layout: post
status: publish
published: true
title: An Explanation of My Recent &quot;Self Destruct&quot; Application
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: dylanmtaylor
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 791
wordpress_url: http://www.dylanmtaylor.com/?p=791
date: '2010-11-11 03:28:59 +0000'
date_gmt: '2010-11-11 03:28:59 +0000'
---
<p><a href="/?attachment_id=857"><img class="alignleft size-thumbnail wp-image-857" title="Self Destruct Icon" src="/images/blog/2010/11/skull-and-crossbones-redish2-150x150.png" alt="" width="150" height="150" /></a>"<span class="zem_slink">Self Destruct</span>" is simply an <a class="zem_slink" title="Application software" rel="wikipedia" href="http://en.wikipedia.org/wiki/Application_software">application</a> I made for fun, as a <a class="zem_slink" title="Proof of concept" rel="wikipedia" href="http://en.wikipedia.org/wiki/Proof_of_concept">proof of concept</a>. This application demonstrates a way to create an application that is able to "destroy" itself, preventing it from running until it is uninstalled, and then reinstalled later. I'd like to personally thank <a href="http://blog.handlerexploit.com/">HandlerExploit</a> for giving me a hint about how to do this (he mentioned that he found the trick in the provisioning code). HandlerExploit uses a similar technique in his application, "iBrick Proof of Concept". As soon as the user opens the application, it removes it's main class from the <a class="zem_slink" title="Dalvik (software)" rel="wikipedia" href="http://en.wikipedia.org/wiki/Dalvik_%28software%29">Dalvik</a> <a class="zem_slink" title="Package management system" rel="wikipedia" href="http://en.wikipedia.org/wiki/Package_management_system">package manager</a>, preventing itself from being able to run again. The only way to run the application again after opening it is to uninstall the application, and reinstall it. This application serves no real purpose other than to demonstrate an interesting trick, and it is not malicious in any way. Please note that after running the application, it's icon will remain in the launcher, although you won't be able to open it. Uninstalling the application will remove the icon. I'd release the entire <a class="zem_slink" title="Source code" rel="wikipedia" href="http://en.wikipedia.org/wiki/Source_code">source code</a> for this application, but really, the only part that actually matters is the part that removes the class from Dalvik and prevents the application from running again. Interestingly, this application requires absolutely no permissions, at all in order to do this. In case you are interested in how I did this, here is the source code for the main class in the project:</p>
<pre>package com.dylantaylor.selfdestruct;
import android.app.Activity;
import android.content.ComponentName;
import android.content.pm.PackageManager;
import android.os.Bundle;

public class Main extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        PackageManager pm = getPackageManager(); ComponentName name = new ComponentName(this, Main.class);
        pm.setComponentEnabledSetting(name, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, 0);
    }
}</pre>
<p>Yes, I realize that this application serves no real purpose, but it's just something interesting that I made for fun. If you don't want it, don't download it. Otherwise, have fun! :)</p>
<p><strong>P.S.</strong> Do whatever you want with that source code, it's virtually worthless to me anyways.</p>
