import {S3, SNS, CloudWatchEvents, Lambda} from '../aws';

export const retrieveObjectFromS3 = async (bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    const data = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};

export const uploadObjectToS3 = async (object: any, bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(object)
    };
    return S3.putObject(params).promise();
};

export const publishToSnsTopic = async (message: string, topicArn: string): Promise<any> => {
    const params = {
        Message: message,
        TopicArn: topicArn
    };
    return SNS.publish(params).promise();
};

export const createCloudWatchEvent = async (putRuleParams: any, putTargetsParams: any): Promise<any> => {
    return Promise.all([
        CloudWatchEvents.putRule(putRuleParams).promise(),
        CloudWatchEvents.putTargets(putTargetsParams).promise()
    ]);
};

export const invokeLambdaFunction = async (functionName: string, payload: any = {}): Promise<any> => {
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };
    const response = await Lambda.invoke(params).promise();
    return JSON.parse(response.Payload.toString());
};
