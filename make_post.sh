#!/bin/bash
TITLE="$1"
YMD=$(date +"%Y-%m-%d")
FILE=$(echo "$YMD-$TITLE.md" | sed -e 's/ /_/g' | tr -cd '[:alnum:]._-' | tr '[:upper:]' '[:lower:]')
cat <<EOF > "posts/$FILE"
---
date: '$YMD'
title: $TITLE
description: 
---
## $TITLE

EOF
echo "$FILE"
