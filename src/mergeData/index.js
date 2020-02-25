const fs = require('fs');
const lineupRules = JSON.parse(fs.readFileSync('src/resources/lineupRules.json'));
const aws = require('../aws');
const goalieScraper = require('../goalieScraper/index');
const {combineDataIntoPlayerPool} = require("./combineDataIntoPlayerPool");

exports.handler = async (event) => {
    const {invocationType, sport, maxCombinations} = event;
    return Promise.all(
        [
            aws.retrieveObjectFromS3('fanduelData.json'),
            aws.retrieveObjectFromS3(`${sport}ProjectionsData.json`),
            sport === 'nhl' ? goalieScraper.handler() : []
        ])
        .then(([fanduelData, projectionsData, projectedGoalies]) => {
            return combineDataIntoPlayerPool(sport, fanduelData, projectionsData, projectedGoalies)
        })
        .then(playerPool => {
            return aws.uploadObjectToS3(playerPool, `${sport}PlayerPool.json`);
        })
        .then(() => {
            const {lineupPositions, lineupRestrictions, salaryCap} = lineupRules['fd'][sport]['Classic'];
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