#!/bin/bash
#This script losslessly compresses and optimizes all png files on the web server in order
#to save bandwidth and reduce page load time. Written by Dylan Taylor. Feel free to copy.
#Compress all png files, saving the new file with a cmp ending, and then replace the old file.
#If the file fails to be moved, we probably don't have permission to overwrite the original, so we remove the crush file
find . -nowarn -name '*.crush' -type f -exec echo "Removing " {} \; -exec rm -f {} \; #Remove old crush files from aborted executions
export PATH=$PATH:/usr/bin #where pngcrush is located
find . -nowarn -name '*.png' -type f -exec pngcrush -brute -reduce -fix {} {}.crush \; -exec mv -fv {}.crush {} \;
find . -nowarn -name '*.crush' -type f -exec echo "Removing " {} \; -exec rm -f {} \; #Cleanup after ourselves...
echo "PNG Compression Done! :-)"
