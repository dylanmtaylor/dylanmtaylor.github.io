DATE=$(date --iso-8601=seconds)
TITLE="$1"
YMD=$(date +"%Y-%m-%d") 
FILE=$(echo $YMD-$TITLE.markdown | sed -e 's/ /_/g' | tr -cd '[[:alnum:]]._-' | tr '[:upper:]' '[:lower:]')
cat <<EOF > _posts/$FILE
---
layout: post
title: $TITLE
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '$DATE'
---
EOF
echo $FILE
