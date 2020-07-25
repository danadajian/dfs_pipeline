import * as AWS from 'aws-sdk';
import './env'

AWS.config.credentials = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
export const SNS = new AWS.SNS();
export const S3 = new AWS.S3();
export const CloudWatchEvents = new AWS.CloudWatchEvents({apiVersion: '2015-10-07'});
export const Lambda = new AWS.Lambda();
