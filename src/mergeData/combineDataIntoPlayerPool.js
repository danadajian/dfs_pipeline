const combineDataIntoPlayerPool = (sport, fanduelData, projectionsData, projectedGoalies) => {
    let combinedData = [];
    const fanduelPlayers = getFanduelPlayersFromSport(sport, fanduelData);
    let filteredFanduelPlayers = (sport === 'nhl') ?
        filterOutUnprojectedGoaliesFromFanduelData(fanduelPlayers, projectedGoalies) : fanduelPlayers;
    filteredFanduelPlayers.forEach(player => {
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

const filterOutUnprojectedGoaliesFromFanduelData = (fanduelPlayers, projectedGoalies) => {
    const projectedGoalieNames = projectedGoalies.map(playerObject => playerObject.name);
    let filteredFanduelPlayers = [];
    fanduelPlayers.forEach(player => {
        if (player.position === 'G' && projectedGoalieNames.includes(player.name))
            player.status = projectedGoalies.find(goalie => goalie.name === player.name).status;
        if (player.position !== 'G' || projectedGoalieNames.includes(player.name))
            filteredFanduelPlayers.push(player);
    });
    return filteredFanduelPlayers;
};

exports.combineDataIntoPlayerPool = combineDataIntoPlayerPool;
exports.getFanduelPlayersFromSport = getFanduelPlayersFromSport;
exports.filterOutUnprojectedGoaliesFromFanduelData = filterOutUnprojectedGoaliesFromFanduelData;