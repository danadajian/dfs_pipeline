require('dotenv').config();
let AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
AWS.config.credentials = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
const s3 = new AWS.S3();

const retrieveObjectFromS3 = async (fileName) => {
    let params = {
        Bucket: "dfs-pipeline",
        Key: fileName
    };
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};

exports.retrieveObjectFromS3 = retrieveObjectFromS3;