#!/bin/bash -e

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
fi

TIMESTAMP=$( date +"%Y-%m-%d_%H-%M-%S" )
FILE_NAME="dfs-pipeline-js-$TIMESTAMP.zip"

zip "$FILE_NAME" src \
node_modules/axios node_modules/follow-redirects node_modules/xml2js node_modules/xmlbuilder node_modules/sax \
node_modules/underscore node_modules/@types node_modules/boolbase node_modules/cheerio node_modules/css-select \
node_modules/css-what node_modules/domelementtype node_modules/domhandler node_modules/dom-serializer \
node_modules/domutils node_modules/entities node_modules/htmlparser2 node_modules/nth-check node_modules/inherits \
node_modules/lodash

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