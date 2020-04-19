#!/bin/bash -e

export STACK_NAME="dfs-pipeline-stack"

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null; then
  echo "### Bucket exists: $BUCKET_NAME"
else
  echo "### Bucket does not exist, creating: ${BUCKET_NAME}"
  aws s3 mb s3://"${BUCKET_NAME}"
fi

IAM_ROLES=$(aws iam list-roles)
export STEP_FUNCTIONS_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("AWS_Events_Invoke_Step_Functions"))' | jq '.Arn' | tr -d '"')
export DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("StepFunctions-DFSPipeLine-role"))' | jq '.Arn' | tr -d '"')

chmod +x ./scripts/createEnvAndDeploy.sh
./scripts/createEnvAndDeploy.sh

chmod +x ./scripts/createOrUpdateStateMachine.sh
./scripts/createOrUpdateStateMachine.sh
