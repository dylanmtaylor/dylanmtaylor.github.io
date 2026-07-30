#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 || -z ${1// } ]]; then
    echo "Usage: $0 \"Post title\"" >&2
    exit 2
fi

TITLE=$1
if [[ $TITLE == *$'\n'* ]]; then
    echo "Post titles cannot contain newlines." >&2
    exit 2
fi

DATE=$(date +"%Y-%m-%d")
SLUG=$(printf '%s' "$TITLE" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^[:alnum:]]+/-/g; s/^-+|-+$//g')

if [[ -z $SLUG ]]; then
    echo "The post title must contain at least one letter or number." >&2
    exit 2
fi

FILE="posts/$DATE-$SLUG.md"
if [[ -e $FILE ]]; then
    echo "$FILE already exists; refusing to overwrite it." >&2
    exit 1
fi

TITLE_JSON=$(node -e 'process.stdout.write(JSON.stringify(process.argv[1]))' "$TITLE")
cat > "$FILE" <<EOF
---
date: '$DATE'
title: $TITLE_JSON
description: ''
---
## $TITLE

EOF

printf '%s\n' "$FILE"
