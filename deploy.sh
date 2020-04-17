#!/bin/bash -e

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
fi

TIMESTAMP=$( date +"%Y-%m-%d_%H-%M-%S" )
FILE_NAME="dfs-pipeline-$TIMESTAMP.zip"

zip -r "$FILE_NAME" .
echo "Zipped $FILE_NAME successfully."

echo "### Initiating SAM Deploy..."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"
aws s3 cp ./dfs-pipeline-state-machine-definition.yaml "s3://${BUCKET_NAME}/"

STACK_NAME="dfs-pipeline-stack"

sam --version
sam deploy --template-file ./template.yaml --stack-name "${STACK_NAME}" --capabilities CAPABILITY_IAM \
 --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" AwsKey="${AWS_ACCESS_KEY_ID}" \
 AwsSecret="${AWS_SECRET_ACCESS_KEY}" FanduelApiRoot="${FANDUEL_API_ROOT}" DanPhoneNumber="${DAN_PHONE_NUMBER}" \
 TonyPhoneNumber="${TONY_PHONE_NUMBER}" --no-fail-on-empty-changeset