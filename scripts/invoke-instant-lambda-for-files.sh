#!/bin/bash

#file passed to this script is expected to contain records as below (with quotes at start and end)
#"org/d5f28372-038c-4f38-b9b5-62c42b8befb3.jpg"
#"org/6b86b265-3e33-4a80-8077-7b53fc7090d4.png"

set -e

for file_name in $(cat $1); do
  json_pre='{"Records" : [{"s3": {"bucket": {"name": "prod-user-media"}, "object": {"key":'
  json_post='}}}]}'
  json_payload="$json_pre $file_name $json_post"
  echo "$file_name"
  aws lambda invoke --function-name prod-generate-thumbnails-instantly --invocation-type Event --payload  "$json_payload" --cli-binary-format raw-in-base64-out /dev/stdout
  sleep 0.1 # artificial delay to avoid running into lambda quotas
done
