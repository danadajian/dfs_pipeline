import {generateMessage} from './generateMessage'
import {retrieveObjectFromS3, publishToSnsTopic} from '../aws/aws'
import '../env'

export const publishOptimalLineupHandler = async (event): Promise<string> => {
    const {sport} = event;
    return retrieveObjectFromS3(`${sport}OptimalLineup.json`)
        .then(optimalLineupData => {
            return generateMessage(sport, optimalLineupData)
        })
        .then((message: string) => {
            return publishToSnsTopic(message)
        })
        .then(() => {
            return 'Message published successfully.'
        });
};