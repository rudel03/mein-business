#!/bin/bash
# usage: ing.sh key blobid key blobid ...
R=/root/.claude/projects/-home-user/cbcda7f0-6918-565d-a033-7a4f10e62347/tool-results
while [ $# -gt 1 ]; do cp "$R/mcp-Higgsfield-blob-$2.jpg" "/home/user/honigmama_reihe/work/ph/$1.jpg" && echo -n "$1 "; shift 2; done; echo; ls /home/user/honigmama_reihe/work/ph | wc -l
