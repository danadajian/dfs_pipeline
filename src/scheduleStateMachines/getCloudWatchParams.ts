import {getCronExpressionFromDate, getTodayDateString} from "../helpers/helpers";
import {MAX_COMBINATIONS} from "../constants";

export const getCloudWatchParams = (sport: string, date: Date) => {
    const putRuleParams = {
        Name: `${sport}-pipeline-rule`,
        RoleArn: process.env.STEP_FUNCTIONS_ROLE_ARN,
        ScheduleExpression: getCronExpressionFromDate(date),
        State: 'ENABLED'
    };
    const putTargetsParams = {
        Rule: `${sport}-pipeline-rule`,
        Targets: [
            {
                Arn: process.env.DFS_PIPELINE_STEP_FUNCTION_ARN,
                RoleArn: process.env.STEP_FUNCTIONS_ROLE_ARN,
                Id: 'dfsPipelineTarget',
                Input: JSON.stringify({
                    invocationType: 'pipeline',
                    date: getTodayDateString(),
                    sport,
                    maxCombinations: MAX_COMBINATIONS
                })
            }
        ]
    };
    return {
        putRuleParams,
        putTargetsParams
    }
}