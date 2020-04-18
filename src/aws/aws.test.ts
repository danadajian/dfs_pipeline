import {retrieveObjectFromS3, uploadObjectToS3, sendTextMessage, createCloudWatchEvent} from './aws';
import {getTodayDateString} from '../helpers/helpers';

import {S3, SNS, CloudWatchEvents} from '../aws';
import {MAX_COMBINATIONS} from "../constants";

jest.mock('../helpers/helpers');
jest.mock('../aws');

(getTodayDateString as jest.Mock).mockImplementation(() => {
    return 'mock date string'
});

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
        const phoneNumber = '867-5309';

        beforeEach(async () => {
            result = await sendTextMessage(message, phoneNumber)
        });

        it('should call publish with correct params', function () {
            const params = {
                Message: message,
                MessageStructure: 'string',
                PhoneNumber: phoneNumber
            };
            expect(SNS.publish).toHaveBeenCalledWith(params)
        });

        it('should send text', () => {
            expect(result).toEqual('Text message sent successfully.')
        });
    });

    describe('creates cloudwatch event', () => {
        let result: any;
        const sport = 'football';
        const date = new Date('4/20/2020');

        beforeEach(async () => {
            result = await createCloudWatchEvent(sport, date)
        });

        it('should call putRule with correct params', function () {
            const putRuleParams = {
                Name: 'football-pipeline-rule',
                RoleArn: process.env.STEP_FUNCTIONS_ROLE_ARN,
                ScheduleExpression: 'cron(0 4 20 4 ? 2020)',
                State: 'ENABLED'
            };
            expect(CloudWatchEvents.putRule).toHaveBeenCalledWith(putRuleParams)
        });

        it('should call putTargets with correct params', function () {
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
    })
});