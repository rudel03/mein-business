#!/bin/bash
# up.sh <media-id-prefix> <file>  -> PUT file to the latest Higgsfield upload URL for that id
u=$(grep -o "https://upload.higgsfield.ai/[^ \"']*$1[^ \"']*" /root/.claude/projects/-home-user/cbcda7f0-6918-565d-a033-7a4f10e62347.jsonl | tail -1)
curl -s -o /dev/null -w "$2 %{http_code}\n" -X PUT -H "Content-Type: application/octet-stream" -H "If-None-Match: *" --data-binary @"$2" "$u"
