#!/bin/bash -e

source ./config.sh

BUCKET_NAME="dfs-pipeline"
STACK_NAME="dfs-pipeline-stack"

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
fi

timestamp=$( date +"%Y-%m-%d_%H-%M-%S" )
FILE_NAME="$timestamp-function.zip"

bestzip $FILE_NAME aws.js mergeData.js lineupRules.json scheduleStateMachines.js

echo "### Initiating SAM Deploy..."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"

if [[ "$OSTYPE" == "msys" ]]; then
    sam.cmd --version
    sam.cmd deploy --template-file ./template.yaml --stack-name "${STACK_NAME}" --capabilities CAPABILITY_IAM \
     --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" AwsKey="${AWS_KEY}" \
     AwsSecret="${AWS_SECRET}" FanduelApiRoot="${FANDUEL_API_ROOT}" --no-fail-on-empty-changeset
else
    sam --version
    sam deploy --template-file ./template.yaml --stack-name "${STACK_NAME}" --capabilities CAPABILITY_IAM \
     --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" AwsKey="${AWS_KEY}" \
     AwsSecret="${AWS_SECRET}" FanduelApiRoot="${FANDUEL_API_ROOT}" --no-fail-on-empty-changeset
fi