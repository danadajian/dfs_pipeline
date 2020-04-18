#!/bin/bash -e

LAMBDA_FUNCTIONS=$(aws lambda list-functions)
STATE_MACHINES=$(aws stepfunctions list-state-machines)
IAM_ROLES=$(aws iam list-roles)

FANDUEL_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFanduelDataFunction"))' | jq '.FunctionName' | tr -d '"')
PROJECTIONS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetProjectionsDataFunction"))' | jq '.FunctionName' | tr -d '"')
GOALIE_SCRAPER_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GoalieScraperFunction"))' | jq '.FunctionName' | tr -d '"')
MERGE_DATA_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("MergeDataFunction"))' | jq '.FunctionName' | tr -d '"')
OPTIMAL_LINEUP_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOptimalLineupFunction"))' | jq '.FunctionName' | tr -d '"')
SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("SendOptimalLineupTextsFunction"))' | jq '.FunctionName' | tr -d '"')

DFS_PIPELINE_STEP_FUNCTION_ARN=$(echo "$STATE_MACHINES" | jq -r '.stateMachines[] | select(.name | contains("DFS-Pipeline"))' | jq '.stateMachineArn' | tr -d '"')
DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("StepFunctions-DFSPipeLine-role"))' | jq '.Arn' | tr -d '"')
STEP_FUNCTIONS_ROLE_ARN=$(echo "$IAM_ROLES" | jq -r '.Roles[] | select(.RoleName | contains("AWS_Events_Invoke_Step_Functions"))' | jq '.Arn' | tr -d '"')

export DFS_PIPELINE_STEP_FUNCTION_ARN
export DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN
export STEP_FUNCTIONS_ROLE_ARN

echo "FANDUEL_LAMBDA_ARN: $FANDUEL_LAMBDA_ARN"
echo "PROJECTIONS_LAMBDA_ARN: $PROJECTIONS_LAMBDA_ARN"
echo "GOALIE_SCRAPER_LAMBDA_ARN: $GOALIE_SCRAPER_LAMBDA_ARN"
echo "MERGE_DATA_LAMBDA_ARN: $MERGE_DATA_LAMBDA_ARN"
echo "OPTIMAL_LINEUP_LAMBDA_ARN: $OPTIMAL_LINEUP_LAMBDA_ARN"
echo "SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN: $SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN"
echo "DFS_PIPELINE_STEP_FUNCTION_ARN: $DFS_PIPELINE_STEP_FUNCTION_ARN"
echo "DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN: $DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN"
echo "STEP_FUNCTIONS_ROLE_ARN: $STEP_FUNCTIONS_ROLE_ARN"

STATE_MACHINE_DEFINITION_FILE=stepFunctions/dfs-pipeline.json

sed -i "s/REPLACE_ME_WITH_FANDUEL_LAMBDA_ARN/$FANDUEL_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_PROJECTIONS_LAMBDA_ARN/$PROJECTIONS_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_GOALIE_SCRAPER_LAMBDA_ARN/$GOALIE_SCRAPER_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_MERGE_DATA_LAMBDA_ARN/$MERGE_DATA_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_OPTIMAL_LINEUP_LAMBDA_ARN/$OPTIMAL_LINEUP_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN/$SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE

STATE_MACHINE_DEFINITION_STRING=$(cat $STATE_MACHINE_DEFINITION_FILE)
echo "STATE_MACHINE_DEFINITION_STRING: $STATE_MACHINE_DEFINITION_STRING"

if [ -z "$DFS_PIPELINE_STEP_FUNCTION_ARN" ];
then
  echo "Creating DFS Pipeline state machine..."
  aws stepfunctions create-state-machine \
   --name "DFS-Pipeline" \
   --definition "$STATE_MACHINE_DEFINITION_STRING" \
   --role-arn "$DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN"
else
  echo "State machine exists. Updating..."
  aws stepfunctions update-state-machine \
   --state-machine-arn "$DFS_PIPELINE_STEP_FUNCTION_ARN" \
   --definition "$STATE_MACHINE_DEFINITION_STRING"
fi
