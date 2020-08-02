import {generateMessage} from './generateMessage'
import {DFS_PIPELINE_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import '../env'
import {publishToSnsTopic, retrieveObjectFromS3} from "../aws/aws";

export const publishOptimalLineupHandler = async (event): Promise<string> => {
    const {sport} = event;
    return retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}OptimalLineup.json`)
        .then(optimalLineupData => {
            return generateMessage(sport, optimalLineupData)
        })
        .then((message: string) => {
            return publishToSnsTopic(message, process.env.OPTIMAL_LINEUP_TOPIC_ARN)
        })
        .then(() => {
            return 'Message published successfully.'
        });
};