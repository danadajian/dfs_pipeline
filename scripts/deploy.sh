#!/bin/bash -e

LAMBDA_FUNCTIONS=$(aws lambda list-functions)
IAM_ROLES=$(aws iam list-roles)

export FANDUEL_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFanduelDataFunction"))' | jq '.FunctionArn' | tr -d '"')
export PROJECTIONS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetProjectionsDataFunction"))' | jq '.FunctionArn' | tr -d '"')
export GOALIE_SCRAPER_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GoalieScraperFunction"))' | jq '.FunctionArn' | tr -d '"')
export MERGE_DATA_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("MergeDataFunction"))' | jq '.FunctionArn' | tr -d '"')
export OPTIMAL_LINEUP_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOptimalLineupFunction"))' | jq '.FunctionArn' | tr -d '"')
export SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("SendOptimalLineupTextsFunction"))' | jq '.FunctionArn' | tr -d '"')

export DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("StepFunctions-DFSPipeLine-role"))' | jq '.Arn' | tr -d '"')
export STEP_FUNCTIONS_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("AWS_Events_Invoke_Step_Functions"))' | jq '.Arn' | tr -d '"')

export STACK_NAME="dfs-pipeline-stack"

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null
then
    echo "Bucket exists: $BUCKET_NAME"
else
    echo "Bucket does not exist, creating: ${BUCKET_NAME}"
    aws s3 mb s3://"${BUCKET_NAME}"
fi

chmod +x ./scripts/createEnvAndDeploy.sh
./scripts/createEnvAndDeploy.sh

chmod +x ./scripts/createOrUpdateStateMachine.sh
./scripts/createOrUpdateStateMachine.sh
