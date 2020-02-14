const {getPipelineStartTimes} = require('./getPipelineStartTimes');
const {convertStartTimesToLocal} = require("./convertStartTimesToLocal");
const {staggerPipelineStartTimes} = require("./staggerPipelineStartTimes");
const aws = require('../aws');

exports.handler = async (event) => {
    return getPipelineStartTimes(event['sports'])
        .then(async pipelineStartTimes => {
            for (const sport of Object.keys(pipelineStartTimes)) {
                await aws.createCloudWatchEvent(sport, pipelineStartTimes[sport])
            }
            return pipelineStartTimes
        })
        .then(pipelineStartTimes => {
            return staggerPipelineStartTimes(pipelineStartTimes)
        })
        .then(startTimes => {
            return convertStartTimesToLocal(startTimes)
        })
        .then(localStartTimes => {
            return aws.uploadObjectToS3(localStartTimes, 'startTimes.json')
        })
        .then(() => {
            return 'Events created!'
        });
};
