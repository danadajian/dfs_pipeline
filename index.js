const fs = require('fs');
const lineupRules = JSON.parse(fs.readFileSync('./lineupRules.json'));

exports.handler = (event, context) => {
    const sport = event.sport;
    const fanduelData = event['fanduelData'];
    const projectionsData = event['projectionsData'];
    const contestRules = lineupRules['fd'][sport]['Classic'];
    return {
        'invocationType': 'pipeline',
        'lineup': contestRules.lineupPositions.map(position => ({
            'playerId': 0,
            'position': position,
            'team': '',
            'name': '',
            'projection': '',
            'salary': ''
        })),
        'playerPool': combineDataIntoPlayerPool(sport, fanduelData, projectionsData),
        'blackList': [],
        'lineupPositions': contestRules.lineupPositions,
        'lineupRestrictions': contestRules.lineupRestrictions,
        'salaryCap': contestRules.salaryCap,
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