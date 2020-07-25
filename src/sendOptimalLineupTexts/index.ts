import {generateTextMessageOutput} from './generateTextMessageOutput'
import {retrieveObjectFromS3, publishToSnsTopic} from '../aws/aws'
import '../env'

export const sendOptimalLineupTextsHandler = async (event) => {
    const {sport} = event;
    return retrieveObjectFromS3(`${sport}OptimalLineup.json`)
        .then(optimalLineupData => {
            return generateTextMessageOutput(sport, optimalLineupData)
        })
        .then((message: string) => {
            return publishToSnsTopic(message)
        })
        .then(() => {
            return 'Text messages sent!'
        });
};