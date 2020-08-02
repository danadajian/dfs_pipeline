import {getCloudWatchParams} from "./getCloudWatchParams";
import {getCronExpressionFromDate, getTodayDateString} from "../helpers/helpers";
import {MAX_COMBINATIONS} from "../constants";

jest.mock("../helpers/helpers");

(getTodayDateString as jest.Mock).mockReturnValue('mock date string');

(getCronExpressionFromDate as jest.Mock).mockReturnValue('cron expression');

describe('getCloudWatchParams', () => {
    let result: any;
    const sport = 'football';
    const date = 'mock date';

    beforeEach(async () => {
        // @ts-ignore
        result = await getCloudWatchParams(sport, date)
    });

    it('should return expected result', () => {
        const putRuleParams = {
            Name: 'football-pipeline-rule',
            RoleArn: process.env.STEP_FUNCTIONS_ROLE_ARN,
            ScheduleExpression: 'cron expression',
            State: 'ENABLED'
        };
        const putTargetsParams = {
            Rule: 'football-pipeline-rule',
            Targets: [
                {
                    Arn: process.env.DFS_PIPELINE_STEP_FUNCTION_ARN,
                    RoleArn: process.env.STEP_FUNCTIONS_ROLE_ARN,
                    Id: 'dfsPipelineTarget',
                    Input: JSON.stringify({
                        invocationType: 'pipeline',
                        date: 'mock date string',
                        sport,
                        maxCombinations: MAX_COMBINATIONS
                    })
                }
            ]
        };
        expect(result).toEqual({
            putRuleParams,
            putTargetsParams
        })
    });
});