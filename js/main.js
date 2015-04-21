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
