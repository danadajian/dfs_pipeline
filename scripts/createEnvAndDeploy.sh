#!/bin/bash -e

STATE_MACHINES=$(aws stepfunctions list-state-machines)
DFS_PIPELINE_STEP_FUNCTION_ARN=$(echo "$STATE_MACHINES" | jq -r '.stateMachines[] | select(.name | contains("DFS-Pipeline"))' | jq '.stateMachineArn' | tr -d '"')

LAMBDA_FUNCTIONS=$(aws lambda list-functions)
GET_FANTASY_DATA_LAMBDA_NAME=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFantasyData"))' | jq '.FunctionName' | tr -d '"')
GET_CURRENT_DATA_LAMBDA_NAME=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetCurrentData"))' | jq '.FunctionName' | tr -d '"')

echo "### Creating environment variables..."
{
  echo "AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
  echo "FANDUEL_API_ROOT=$FANDUEL_API_ROOT"
  echo "STEP_FUNCTIONS_ROLE_ARN=$STEP_FUNCTIONS_ROLE_ARN"
  echo "DFS_PIPELINE_STEP_FUNCTION_ARN=$DFS_PIPELINE_STEP_FUNCTION_ARN"
  echo "GET_FANTASY_DATA_LAMBDA_NAME=$GET_FANTASY_DATA_LAMBDA_NAME"
  echo "GET_CURRENT_DATA_LAMBDA_NAME=$GET_CURRENT_DATA_LAMBDA_NAME"
} >.env
cat .env

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
FILE_NAME="dfs-pipeline-$TIMESTAMP.zip"

zip -r -qq "$FILE_NAME" build node_modules .env
echo "### Zipped $FILE_NAME successfully."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"

echo "### Initiating SAM Deploy..."

sam deploy --template-file ./template.yaml --stack-name "${STACK_NAME}" --capabilities CAPABILITY_IAM \
  --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" \
  ScheduleStateMachinesInput="${SCHEDULE_STATE_MACHINES_INPUT}" AwsKey="${AWS_ACCESS_KEY_ID}" \
  AwsSecret="${AWS_SECRET_ACCESS_KEY}" FanduelApiRoot="${FANDUEL_API_ROOT}" DanPhoneNumber="${DAN_PHONE_NUMBER}" \
  TonyPhoneNumber="${TONY_PHONE_NUMBER}" --no-fail-on-empty-changeset
