#!/bin/bash -e

LAMBDA_FUNCTIONS=$(aws lambda list-functions)
STATE_MACHINES=$(aws stepfunctions list-state-machines)
IAM_ROLES=$(aws iam list-roles)

export FANDUEL_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFanduelDataFunction"))' | jq '.FunctionArn' | tr -d '"')
export PROJECTIONS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetProjectionsDataFunction"))' | jq '.FunctionArn' | tr -d '"')
export GOALIE_SCRAPER_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GoalieScraperFunction"))' | jq '.FunctionArn' | tr -d '"')
export MERGE_DATA_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("MergeDataFunction"))' | jq '.FunctionArn' | tr -d '"')
export OPTIMAL_LINEUP_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOptimalLineupFunction"))' | jq '.FunctionArn' | tr -d '"')
export SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("SendOptimalLineupTextsFunction"))' | jq '.FunctionArn' | tr -d '"')

export DFS_PIPELINE_STEP_FUNCTION_ARN=$(echo "$STATE_MACHINES" | jq -r '.stateMachines[] | select(.name | contains("DFS-Pipeline"))' | jq '.stateMachineArn' | tr -d '"')
export DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("StepFunctions-DFSPipeLine-role"))' | jq '.Arn' | tr -d '"')
export STEP_FUNCTIONS_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("AWS_Events_Invoke_Step_Functions"))' | jq '.Arn' | tr -d '"')

TIMESTAMP=$( date +"%Y-%m-%d_%H-%M-%S" )
export FILE_NAME="dfs-pipeline-$TIMESTAMP.zip"

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
fi

mkdir build
touch build/placeholder.txt
zip -r -qq "$FILE_NAME" build
echo "Zipped $FILE_NAME successfully."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"

STACK_NAME="dfs-pipeline-stack"

echo "### Initiating SAM Deploy..."

sam deploy --template-file ./template.yaml --stack-name "${STACK_NAME}" --capabilities CAPABILITY_IAM \
 --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" AwsKey="${AWS_ACCESS_KEY_ID}" \
 AwsSecret="${AWS_SECRET_ACCESS_KEY}" FanduelApiRoot="${FANDUEL_API_ROOT}" DanPhoneNumber="${DAN_PHONE_NUMBER}" \
 TonyPhoneNumber="${TONY_PHONE_NUMBER}" --no-fail-on-empty-changeset

chmod +x ./scripts/createOrUpdateStateMachine.sh
./scripts/createOrUpdateStateMachine.sh

chmod +x ./scripts/buildAndUpload.sh
./scripts/buildAndUpload.sh
