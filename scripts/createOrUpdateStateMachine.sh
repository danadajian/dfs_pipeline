#!/bin/bash -e

LAMBDA_FUNCTIONS=$(aws lambda list-functions)

FANDUEL_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFanduelDataFunction"))' | jq '.FunctionArn' | tr -d '"')
PROJECTIONS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetProjectionsDataFunction"))' | jq '.FunctionArn' | tr -d '"')
GOALIE_SCRAPER_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GoalieScraperFunction"))' | jq '.FunctionArn' | tr -d '"')
MERGE_DATA_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("MergeDataFunction"))' | jq '.FunctionArn' | tr -d '"')
OPTIMAL_LINEUP_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOptimalLineupFunction"))' | jq '.FunctionArn' | tr -d '"')
SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("SendOptimalLineupTextsFunction"))' | jq '.FunctionArn' | tr -d '"')

STATE_MACHINE_DEFINITION_FILE=stepFunctions/dfs-pipeline.json

sed -i "s/REPLACE_ME_WITH_FANDUEL_LAMBDA_ARN/$FANDUEL_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_PROJECTIONS_LAMBDA_ARN/$PROJECTIONS_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_GOALIE_SCRAPER_LAMBDA_ARN/$GOALIE_SCRAPER_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_MERGE_DATA_LAMBDA_ARN/$MERGE_DATA_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_OPTIMAL_LINEUP_LAMBDA_ARN/$OPTIMAL_LINEUP_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE
sed -i "s/REPLACE_ME_WITH_SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN/$SEND_OPTIMAL_LINEUP_TEXTS_LAMBDA_ARN/g" $STATE_MACHINE_DEFINITION_FILE

STATE_MACHINES=$(aws stepfunctions list-state-machines)
DFS_PIPELINE_STEP_FUNCTION_ARN=$(echo "$STATE_MACHINES" | jq -r '.stateMachines[] | select(.name | contains("dfs-pipeline"))' | jq '.stateMachineArn' | tr -d '"')

if [ -z "$DFS_PIPELINE_STEP_FUNCTION_ARN" ]; then
  echo "### Creating DFS Pipeline state machine..."
  aws stepfunctions create-state-machine \
    --name "dfs-pipeline" \
    --definition "$(cat $STATE_MACHINE_DEFINITION_FILE)" \
    --role-arn "$DFS_PIPELINE_STEP_FUNCTION_ROLE_ARN"
  echo "### Re-deploying $STACK_NAME..."
  chmod +x ./scripts/createEnvAndDeploy.sh
  ./scripts/createEnvAndDeploy.sh
else
  echo "### State machine exists. Updating..."
  aws stepfunctions update-state-machine \
    --state-machine-arn "$DFS_PIPELINE_STEP_FUNCTION_ARN" \
    --definition "$(cat $STATE_MACHINE_DEFINITION_FILE)"
fi
