import {
    DFS_PIPELINE_BUCKET_NAME,
    FANTASY_ANALYTICS_BUCKET_NAME,
    LINEUP_RULES
} from "@dadajian/shared-fantasy-constants";
import {combineDataIntoPlayerPool} from './combineDataIntoPlayerPool';
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {getTodayDateString} from "../helpers/helpers";

export const mergeDataHandler = async (event): Promise<any> => {
    let {invocationType, sport, maxCombinations, goalieData = []} = event;
    return Promise.all([
        retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, 'fanduelData.json'),
        retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}ProjectionsData.json`),
    ]).then(([fanduelData, projectionsData]) => {
        return combineDataIntoPlayerPool(sport, fanduelData, projectionsData, goalieData)
    }).then(playerPool => {
        return Promise.all([
            uploadObjectToS3(playerPool, DFS_PIPELINE_BUCKET_NAME, `${sport}PlayerPool.json`),
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentPlayerPools.json`).catch(() => []),
            playerPool
        ])
    }).then(([_, pastPlayerPools, playerPool]) => {
        const playerPoolData = [
            {
                date: getTodayDateString(),
                playerPool
            }
        ];
        const combinedPlayerPoolData = pastPlayerPools.concat(playerPoolData);
        return uploadObjectToS3(combinedPlayerPoolData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentPlayerPools.json`)
    }).then(() => {
        const {lineupPositions, lineupRestrictions, salaryCap} = LINEUP_RULES.Fanduel[sport].Classic;
        return {
            invocationType,
            sport,
            lineup: lineupPositions.map(position => ({
                playerId: 0,
                position,
                team: '',
                name: '',
                projection: '',
                salary: ''
            })),
            blackList: [],
            lineupPositions,
            lineupRestrictions,
            salaryCap,
            maxCombinations
        }
    })
};