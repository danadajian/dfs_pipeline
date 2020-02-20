const fs = require('fs');
const lineupRules = JSON.parse(fs.readFileSync('src/resources/lineupRules.json'));
const aws = require('../aws');
const {combineDataIntoPlayerPool} = require("./combineDataIntoPlayerPool");

exports.handler = async (event) => {
    const sport = event[1].sport;
    return Promise.all(
        [
            aws.retrieveObjectFromS3('fanduelData.json'),
            aws.retrieveObjectFromS3(`${sport}ProjectionsData.json`)
        ])
        .then(([fanduelData, projectionsData]) => {
            return combineDataIntoPlayerPool(sport, fanduelData, projectionsData)
        })
        .then(playerPool => {
            return aws.uploadObjectToS3(playerPool, `${sport}PlayerPool.json`);
        })
        .then(() => {
            const {lineupPositions, lineupRestrictions, salaryCap} = lineupRules['fd'][sport]['Classic'];
            return JSON.stringify({
                'invocationType': 'pipeline',
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
                'maxCombinations': 500000000
            })
        })
};