import {generateTextMessageOutput} from './generateTextMessageOutput'
import {retrieveObjectFromS3, sendTextMessage} from '../aws/aws'
require('dotenv').config();

export const sendOptimalLineupTextsHandler = async (event) => {
    const {sport} = event;
    return retrieveObjectFromS3(sport + 'OptimalLineup.json')
        .then(optimalLineupData => {
            return generateTextMessageOutput(sport, optimalLineupData)
        })
        .then(async textMessageOutput => {
            await sendTextMessage(textMessageOutput, process.env.DAN_PHONE_NUMBER);
            await sendTextMessage(textMessageOutput, process.env.TONY_PHONE_NUMBER);
        })
        .then(() => {
            return 'Text messages sent!'
        });
};