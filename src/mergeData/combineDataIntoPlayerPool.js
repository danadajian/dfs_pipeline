const combineDataIntoPlayerPool = (sport, fanduelData, projectionsData, projectedGoalies) => {
    let combinedData = [];
    const fanduelPlayers = getFanduelPlayersFromSport(sport, fanduelData);
    if (sport === 'nhl')
        addGoalieStatusesToFanduelData(fanduelPlayers, projectedGoalies);
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

const addGoalieStatusesToFanduelData = (fanduelPlayers, projectedGoalies) => {
    const projectedGoalieLastNames = projectedGoalies.map(playerObject => playerObject.name);
    fanduelPlayers.forEach(player => {
        let playerLastName = player.name.split(' ')[1];
        if (player.position === 'G' && projectedGoalieLastNames.includes(playerLastName))
            player.status = projectedGoalies.find(goalie => goalie.name === playerLastName).status;
        else if (player.position === 'G')
            player.status = 'Unconfirmed'
    });
    return fanduelPlayers;
};

exports.combineDataIntoPlayerPool = combineDataIntoPlayerPool;
exports.getFanduelPlayersFromSport = getFanduelPlayersFromSport;
exports.addGoalieStatusesToFanduelData = addGoalieStatusesToFanduelData;