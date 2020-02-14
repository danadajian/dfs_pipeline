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

const getFanduelPlayersFromSport = (sport, fanduelData) => {
    return fanduelData.filter(contestObject =>
        contestObject['contest'] === 'Main' &&
        contestObject['sport'].toLowerCase() === sport)[0]['players']
};

exports.combineDataIntoPlayerPool = combineDataIntoPlayerPool;
exports.getFanduelPlayersFromSport = getFanduelPlayersFromSport;