function prepare() {
	//try to encourage the use of HTTPS by default
	if (window.location.protocol != "https:") {
    		//window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
	}
}
function navigate(page) {
	$.get(page, function(data) {
		   document.getElementById("pagecontent").innerHTML = data;
       });
}
function go(page) {
	try {
		navigate(page);
	} catch(err)  {
		window.location.replace(page);		
	}
}
function resizeIframe(iframe) {
	iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
}
