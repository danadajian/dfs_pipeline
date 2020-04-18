#!/bin/bash -e

npm run build

{
  echo "AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
  echo "FANDUEL_API_ROOT=$FANDUEL_API_ROOT"
  echo "STEP_FUNCTIONS_ROLE_ARN=$STEP_FUNCTIONS_ROLE_ARN"
  echo "DFS_PIPELINE_STEP_FUNCTION_ARN=$DFS_PIPELINE_STEP_FUNCTION_ARN"
} >> .env

cat .env

zip -r -qq "$FILE_NAME" build node_modules .env
echo "Zipped $FILE_NAME successfully."

echo "Uploading code to S3..."

aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"
