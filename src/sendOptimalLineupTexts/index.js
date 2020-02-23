const {generateTextMessageOutput} = require("./generateTextMessageOutput");
const aws = require('../aws');

exports.handler = async (event) => {
    const {sport} = event;
    return aws.retrieveObjectFromS3(sport + 'OptimalLineup.json')
        .then(optimalLineupData => {
            return generateTextMessageOutput(sport, optimalLineupData)
        })
        .then(async textMessageOutput => {
            await aws.sendTextMessage(textMessageOutput, process.env.DAN_PHONE_NUMBER);
            await aws.sendTextMessage(textMessageOutput, process.env.TONY_PHONE_NUMBER);
        })
        .then(() => {
            return 'Text messages sent!'
        });
};