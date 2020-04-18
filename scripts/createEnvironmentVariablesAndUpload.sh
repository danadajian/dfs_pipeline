#!/bin/bash -e

{
  echo "AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
  echo "FANDUEL_API_ROOT=$FANDUEL_API_ROOT"
  echo "STEP_FUNCTIONS_ROLE_ARN=$STEP_FUNCTIONS_ROLE_ARN"
  echo "DFS_PIPELINE_STEP_FUNCTION_ARN=$DFS_PIPELINE_STEP_FUNCTION_ARN"
} >> ./build/.env

cat ./build/.env

zip -r "$FILE_NAME" build
echo "Zipped $FILE_NAME successfully."

echo "Uploading code to S3..."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"
