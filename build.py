#!/usr/bin/python
pages = ['home','contact', 'contact/thanks', 'donate','portfolio', 'resume'];
titles = ['Home','Contact Me', 'Thanks for the Message', 'Donation Page','Portfolio', 'R&eacute;sum&eacute;'];
for page, title in zip(pages,titles):
	print "Building " + page + "..."
	print "<!DOCTYPE HTML>\n<head>"
	print "\t<title>Dylan M. Taylor's Personal Homepage - " + title + "</title>"
	with open('interface/head.html','r') as f:    head = f.readlines()
	for line in head:
		print '\t' + line,
	print "</head>"
	print "<body onload='prepare();>"
	with open('interface/header.html','r') as f:    header = f.read()
	print "\t<div class=\"header\">\n\t\t" + header + "\t</div>"
	with open('interface/navigation.html','r') as f:    navigation = f.readlines()
	print "\t<div class=\"left\">"
	for line in navigation:
		print '\t\t' + line,
	print "\t</div>"
	fname = "pages/full/"+page+"/content.html"
	with open(fname,'r') as f:    content = f.readlines()
	print "\t<div class=\"pagecontent\" id=\"pagecontent\">"
	for line in content:
		print '\t\t' + line,
	print "\t</div>"
	with open('interface/end.html','r') as f:    ending = f.readlines()
	for line in ending:
		print line,
