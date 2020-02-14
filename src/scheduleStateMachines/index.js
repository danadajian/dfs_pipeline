const {getStartTimes} = require('./getStartTimes');
const {convertStartTimesToLocal} = require("./convertStartTimesToLocal");
const aws = require('../aws');

exports.handler = async (event) => {
    return getStartTimes(event['sports'])
        .then(startTimes => {
            for (const sport of event['sports']) {
                aws.createCloudWatchEvent(sport, startTimes[sport])
            }
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
