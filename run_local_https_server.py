#!/usr/bin/python
# taken from http://www.piware.de/2011/01/creating-an-https-server-in-python/
# generate server.xml with the following command:
#    openssl req -new -x509 -keyout dev_server.pem -out dev_server.pem -days 365 -nodes
# run as follows:
#    sudo python run_local_https_server.py
# then in your browser, visit:
#    https://dev.dylanmtaylor.com:443

import BaseHTTPServer, SimpleHTTPServer
import ssl

httpd = BaseHTTPServer.HTTPServer(('dev.dylanmtaylor.com', 443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, certfile='./dev_server.pem', server_side=True)
httpd.serve_forever()
