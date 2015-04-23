#!/usr/bin/python
pages = ['home','contact', 'contact/thanks', 'donate','portfolio', 'resume'];
titles = ['Home','Contact Me', 'Thanks for the Message', 'Donation Page','Portfolio', 'R&eacute;sum&eacute;'];
for page, title in zip(pages,titles):
	path = "./pages/full/"+page+"/index.html"
	f = open(path, 'w')
	print "Building " + page + " (title: \"" + title + "\") ..."
	f.write("<!DOCTYPE HTML>\n<head>\n")
	f.write("\t<title>Dylan Taylor's Personal Homepage - " + title + "</title>\n")
	with open('interface/head.html','r') as i:    head = i.readlines()
	for line in head:
		f.write('\t' + line)
	f.write("</head>\n")
	f.write("<body>\n")
	with open('interface/header.html','r') as i:    header = i.read()
	f.write("\t<div class=\"header\">\n\t\t" + header + "\t</div>\n")
	with open('interface/navigation.html','r') as i:    navigation = i.readlines()
	f.write("\t<div class=\"left\">\n")
	for line in navigation:
		f.write('\t\t' + line)
	f.write("\t</div>\n")
	fname = "./pages/full/"+page+"/content.html"
	with open(fname,'r') as i:    content = i.readlines()
	f.write("\t<div class=\"pagecontent\" id=\"pagecontent\">\n")
	for line in content:
		f.write('\t\t' + line)
	f.write("\t</div>\n")
	with open('./interface/end.html','r') as i:    ending = i.readlines()
	for line in ending:
		f.write(line)
