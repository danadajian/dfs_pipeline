import {generateTextMessageOutput} from './generateTextMessageOutput'
import {retrieveObjectFromS3, sendTextMessage} from '../aws/aws'
import '../env'

export const sendOptimalLineupTextsHandler = async (event) => {
    const {sport} = event;
    return retrieveObjectFromS3(sport + 'OptimalLineup.json')
        .then(optimalLineupData => {
            return generateTextMessageOutput(sport, optimalLineupData)
        })
        .then(textMessageOutput => {
            return Promise.all([
                sendTextMessage(textMessageOutput, process.env.DAN_PHONE_NUMBER),
                sendTextMessage(textMessageOutput, process.env.TONY_PHONE_NUMBER)
            ])
        })
        .then(() => {
            return 'Text messages sent!'
        });
};