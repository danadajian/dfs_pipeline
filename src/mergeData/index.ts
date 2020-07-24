import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {combineDataIntoPlayerPool} from './combineDataIntoPlayerPool';
import {LINEUP_RULES} from "@dadajian/shared-fantasy-constants";

export const mergeDataHandler = async (event) => {
    let {invocationType, sport, maxCombinations, goalieData = []} = event;
    return Promise.all(
        [
            retrieveObjectFromS3('fanduelData.json'),
            retrieveObjectFromS3(`${sport}ProjectionsData.json`),
        ])
        .then(([fanduelData, projectionsData]) => {
            return combineDataIntoPlayerPool(sport, fanduelData, projectionsData, goalieData)
        })
        .then(playerPool => {
            return uploadObjectToS3(playerPool, `${sport}PlayerPool.json`);
        })
        .then(() => {
            const {lineupPositions, lineupRestrictions, salaryCap} = LINEUP_RULES.Fanduel[sport].Classic;
            return {
                invocationType,
                sport,
                'lineup': lineupPositions.map(position => ({
                    'playerId': 0,
                    'position': position,
                    'team': '',
                    'name': '',
                    'projection': '',
                    'salary': ''
                })),
                'blackList': [],
                lineupPositions,
                lineupRestrictions,
                salaryCap,
                maxCombinations
            }
        })
};