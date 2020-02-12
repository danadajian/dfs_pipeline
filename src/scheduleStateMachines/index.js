const getSlateStartTimes = require('./getSlateStartTimes');
const aws = require('../aws');

exports.handler = async (event) => {
    const startTimes = await getSlateStartTimes.getStartTimes(event.sports);
    for (const sport of event.sports) {
        await aws.createCloudWatchEvent(sport, startTimes[sport])
    }
    return 'Events created!'
};
