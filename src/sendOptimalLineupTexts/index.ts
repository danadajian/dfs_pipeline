import {generateTextMessageOutput} from './generateTextMessageOutput'
import {retrieveObjectFromS3, sendTextMessage} from '../aws/aws'
import '../env'

export const sendOptimalLineupTextsHandler = async (event) => {
    const {sport} = event;
    return retrieveObjectFromS3(sport + 'OptimalLineup.json')
        .then(optimalLineupData => {
            return Promise.all([
                generateTextMessageOutput(sport, optimalLineupData, 'Dan'),
                generateTextMessageOutput(sport, optimalLineupData, 'Tony')
            ])
        })
        .then(([messageForDan, messageForTony]: string[]) => {
            return Promise.all([
                sendTextMessage(messageForDan, process.env.DAN_PHONE_NUMBER),
                sendTextMessage(messageForTony, process.env.TONY_PHONE_NUMBER)
            ])
        })
        .then(() => {
            return 'Text messages sent!'
        });
};