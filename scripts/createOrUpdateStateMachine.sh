#!/bin/bash -e

LAMBDA_FUNCTIONS=$(aws lambda list-functions)
STATE_MACHINES=$(aws stepfunctions list-state-machines)
IAM_ROLES=$(aws iam list-roles)

FANDUEL_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFanduelDataFunction"))' | jq '.FunctionName')
PROJECTIONS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetProjectionsDataFunction"))' | jq '.FunctionName')
GOALIE_SCRAPER_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GoalieScraperFunction"))' | jq '.FunctionName')
MERGE_DATA_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("MergeDataFunction"))' | jq '.FunctionName')
OPTIMAL_LINEUP_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOptimalLineupFunction"))' | jq '.FunctionName')
SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("SendOptimalLineupTextsFunction"))' | jq '.FunctionName')

DFS_PIPELINE_STEP_FUNCTION_ARN=$(echo "$STATE_MACHINES" | jq -r '.stateMachines[] | select(.name | contains("DFSPipeline"))' | jq '.stateMachineArn')
DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("StepFunctions-DFSPipeLine-role"))' | jq '.Arn')

STATE_MACHINE_DEFINITION_FILE=./stepFunctions/dfs-pipeline.json

sed -i "s/REPLACE_ME_WITH_FANDUEL_LAMBDA_ARN/$FANDUEL_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_PROJECTIONS_LAMBDA_ARN/$PROJECTIONS_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_GOALIE_SCRAPER_LAMBDA_ARN/$GOALIE_SCRAPER_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_MERGE_DATA_LAMBDA_ARN/$MERGE_DATA_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_OPTIMAL_LINEUP_LAMBDA_ARN/$OPTIMAL_LINEUP_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN/$SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE

STATE_MACHINE_DEFINITION_STRING=$(jq '.' ./stepFunctions/dfs-pipeline.json)

if [ -z "$DFS_PIPELINE_STEP_FUNCTION_ARN" ];
then
  aws stepfunctions create-state-machine \
   --name "DFSPipeline" \
   --definition "$STATE_MACHINE_DEFINITION_STRING" \
   --role-arn "$DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN"
else
  aws stepfunctions update-state-machine \
   --state-machine-arn "$DFS_PIPELINE_STEP_FUNCTION_ARN" \
   --definition "$STATE_MACHINE_DEFINITION_STRING"
fi