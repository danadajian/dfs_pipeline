const {generateTextMessageOutput} = require("./generateTextMessageOutput");
const aws = require('../aws');

exports.handler = async (event) => {
    const sport = event[0];
    return aws.retrieveObjectFromS3(sport + 'OptimalLineup.json')
        .then(optimalLineupData => {
            return generateTextMessageOutput(sport, optimalLineupData)
        })
        .then(textMessageOutput => {
            Promise.all([
                aws.sendTextMessage(textMessageOutput, process.env.DAN_PHONE_NUMBER),
                aws.sendTextMessage(textMessageOutput, process.env.TONY_PHONE_NUMBER)
            ])
        })
        .then(() => {
            return 'Text messages sent!'
        });
};