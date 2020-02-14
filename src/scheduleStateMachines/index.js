const {getPipelineStartTimes} = require('./getPipelineStartTimes');
const {convertStartTimesToLocal} = require("./convertStartTimesToLocal");
const {staggerPipelineStartTimes} = require("./staggerPipelineStartTimes");
const aws = require('../aws');

exports.handler = async (event) => {
    return getPipelineStartTimes(event['sports'])
        .then(pipelineStartTimes => {
            for (const sport of event['sports']) {
                aws.createCloudWatchEvent(sport, pipelineStartTimes[sport])
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
        .finally(() => {
            return 'Events created!'
        });
};
