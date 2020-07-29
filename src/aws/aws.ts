import {S3, SNS, CloudWatchEvents, Lambda} from '../aws';
import {MAX_COMBINATIONS} from '../constants';
import '../env'
import {getCronExpressionFromDate, getTodayDateString} from '../helpers/helpers';

export const retrieveObjectFromS3 = async (fileName: string): Promise<any> => {
    const params = {
        Bucket: 'dfs-pipeline',
        Key: fileName
    };
    const data = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};

export const uploadObjectToS3 = async (object: any, fileName: string): Promise<string> => {
    const params = {
        Bucket: 'dfs-pipeline',
        Key: fileName,
        Body: JSON.stringify(object)
    };
    await S3.putObject(params).promise();
    return 'File uploaded successfully.'
};

export const publishToSnsTopic = async (message: string): Promise<string> => {
    const params = {
        Message: message,
        TopicArn: process.env.OPTIMAL_LINEUP_TOPIC_ARN
    };
    await SNS.publish(params).promise();
    return 'Message published successfully.'
};

export const createCloudWatchEvent = async (sport: string, date: Date): Promise<string> => {
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
    await CloudWatchEvents.putRule(putRuleParams).promise();
    await CloudWatchEvents.putTargets(putTargetsParams).promise();
    return 'Cloudwatch events created.';
};

export const invokeLambdaFunction = async (functionName: any, payload: any = {}): Promise<any> => {
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };
    const response: any = await Lambda.invoke(params).promise();
    return JSON.parse(response.Payload.toString());
};
