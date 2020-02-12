const fs = require('fs');
const lineupRules = JSON.parse(fs.readFileSync('src/resources/lineupRules.json'));
const aws = require('../aws');

exports.handler = async (event) => {
    const sport = event[1].sport;
    const fanduelData = await aws.retrieveObjectFromS3('fanduelData.json');
    const projectionsData = await aws.retrieveObjectFromS3(`${sport}ProjectionsData.json`);
    const playerPool = combineDataIntoPlayerPool(sport, fanduelData, projectionsData);
    await aws.uploadObjectToS3(playerPool, `${sport}PlayerPool.json`);
    const {lineupPositions, lineupRestrictions, salaryCap} = lineupRules['fd'][sport]['Classic'];
    return {
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
        'maxCombinations': 10000000
    }
};

const getFanduelPlayersFromSport = (sport, fanduelData) => {
    return fanduelData.filter(contestObject =>
        contestObject['contest'] === 'Main' &&
        contestObject['sport'].toLowerCase() === sport)[0]['players']
};

const combineDataIntoPlayerPool = (sport, fanduelData, projectionsData) => {
    let combinedData = [];
    const fanduelPlayers = getFanduelPlayersFromSport(sport, fanduelData);
    fanduelPlayers.forEach(player => {
        let newPlayer = JSON.parse(JSON.stringify(player));
        if (!player.playerId)
            newPlayer.playerId = parseInt(
                Object.keys(projectionsData)
                    .filter(playerId => projectionsData[playerId].name === player.name)[0]
            );
        let playerData = projectionsData[newPlayer.playerId];
        if (playerData) {
            newPlayer.projection = playerData['fdProjection'];
            combinedData.push(newPlayer);
        }
    });
    return combinedData;
};

exports.getFanduelPlayersFromSport = getFanduelPlayersFromSport;
exports.combineDataIntoPlayerPool = combineDataIntoPlayerPool;