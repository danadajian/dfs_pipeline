import {generateMessage} from './generateMessage'
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import '../env'
import {publishToSnsTopic, retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {getTodayDateString} from "../helpers/helpers";

export const publishOptimalLineupHandler = async (event): Promise<string> => {
    const {sport} = event;
    return retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentOptimalLineups.json`)
        .catch(() => [])
        .then(pastOptimalLineupData => {
            return Promise.all([
                pastOptimalLineupData,
                retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}OptimalLineup.json`)
            ])
        })
        .then(([pastOptimalLineupData, optimalLineupObject]) => {
            const optimalLineupData = [
                {
                    date: getTodayDateString(),
                    lineup: optimalLineupObject.lineup
                }
            ];
            const combinedOptimalLineupData = pastOptimalLineupData.concat(optimalLineupData);
            return Promise.all([
                uploadObjectToS3(combinedOptimalLineupData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentOptimalLineups.json`),
                optimalLineupObject
            ])
        }).then(([_, optimalLineupObject]) => {
            return generateMessage(sport, optimalLineupObject)
        }).then((message: string) => {
            return publishToSnsTopic(message, process.env.OPTIMAL_LINEUP_TOPIC_ARN)
        }).then(() => {
            return 'Message published successfully.'
        });
};