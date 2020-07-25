import {
    retrieveObjectFromS3,
    uploadObjectToS3,
    publishToSnsTopic,
    createCloudWatchEvent,
    invokeLambdaFunction
} from './aws';
import {getCronExpressionFromDate, getTodayDateString} from '../helpers/helpers';

import {S3, SNS, CloudWatchEvents, Lambda} from '../aws';
import {MAX_COMBINATIONS} from "../constants";

jest.mock('../helpers/helpers');
jest.mock('../aws');

(getTodayDateString as jest.Mock).mockReturnValue('mock date string');

(getCronExpressionFromDate as jest.Mock).mockReturnValue('cron expression');

(S3.getObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Body: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

(S3.putObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(SNS.publish as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(CloudWatchEvents.putRule as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(CloudWatchEvents.putTargets as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(Lambda.invoke as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Payload: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

describe('aws', () => {
    describe('retrieves specified object', () => {
        let result: any;
        beforeEach(async () => {
            result = await retrieveObjectFromS3('file.json');
        });

        it('should call getObject with correct params', () => {
            const params = {
                Bucket: "dfs-pipeline",
                Key: 'file.json'
            };
            expect(S3.getObject).toHaveBeenCalledWith(params)
        });

        it('should retrieve object', () => {
            expect(result).toEqual({some: 'stuff'});
        });
    });

    describe('uploads object', () => {
        let result: any;
        const playerPool = ['player1', 'player2', 'player3'];
        beforeEach(async () => {
            result = await uploadObjectToS3(playerPool, 'file.json')
        });

        it('should call putObject with correct params', () => {
            const params = {
                Bucket: "dfs-pipeline",
                Key: 'file.json',
                Body: JSON.stringify(playerPool)
            };
            expect(S3.putObject).toHaveBeenCalledWith(params)
        });

        it('should upload successfully', () => {
            expect(result).toEqual('File uploaded successfully.')
        });
    });

    describe('sends text message', () => {
        let result: any;
        const message = 'a message';

        beforeEach(async () => {
            result = await publishToSnsTopic(message)
        });

        it('should call publish with correct params', () => {
            const params = {
                Message: message,
                TopicArn: process.env.OPTIMAL_LINEUP_TOPIC_ARN
            };
            expect(SNS.publish).toHaveBeenCalledWith(params)
        });

        it('should publish message', () => {
            expect(result).toEqual('Message published successfully.')
        });
    });

    describe('creates cloudwatch event', () => {
        let result: any;
        const sport = 'football';
        const date = 'mock date';

        beforeEach(async () => {
            result = await createCloudWatchEvent(sport, date)
        });

        it('should call putRule with correct params', () => {
            const putRuleParams = {
                Name: 'football-pipeline-rule',
                RoleArn: process.env.STEP_FUNCTIONS_ROLE_ARN,
                ScheduleExpression: 'cron expression',
                State: 'ENABLED'
            };
            expect(CloudWatchEvents.putRule).toHaveBeenCalledWith(putRuleParams)
        });

        it('should call putTargets with correct params', () => {
            const putTargetParams = {
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
            expect(CloudWatchEvents.putTargets).toHaveBeenCalledWith(putTargetParams)
        });

        it('should create events', () => {
            expect(result).toEqual('Cloudwatch events created.')
        });
    });

    describe('invokes lambda function', () => {
        let result: any;
        beforeEach(async () => {
            result = await invokeLambdaFunction('function name', {some: 'payload'});
        });

        it("calls lambda invoke with correct params", () => {
            const params = {
                FunctionName: 'function name',
                Payload: JSON.stringify({some: 'payload'})
            };
            expect(Lambda.invoke).toHaveBeenCalledWith(params);
        });

        it('should return the expected result', () => {
            expect(result).toEqual({some: 'stuff'})
        });
    })
});
