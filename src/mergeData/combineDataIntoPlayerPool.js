const combineDataIntoPlayerPool = (sport, fanduelData, projectionsData, goalieData) => {
    let combinedData = [];
    const fanduelPlayers = getFanduelPlayersFromSport(sport, fanduelData);
    let playerIdsToExclude = [];
    if (goalieData)
        playerIdsToExclude = getPlayerIdsToExclude(fanduelPlayers, goalieData);
    fanduelPlayers.forEach(player => {
        let newPlayer = JSON.parse(JSON.stringify(player));
        if (!player.playerId)
            newPlayer.playerId = parseInt(
                Object.keys(projectionsData)
                    .filter(playerId => projectionsData[playerId].name === player.name)[0]
            );
        let playerData = projectionsData[newPlayer.playerId];
        if (playerData && !playerIdsToExclude.includes(newPlayer.playerId)) {
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

const getPlayerIdsToExclude = (fanduelPlayers, goalieData) => {
    let playerIdsToExclude = [];
    const fanduelGoalies = fanduelPlayers.filter(player => player.position === 'G');
    const confirmedGoalieLastNames = goalieData.filter(goalie =>
        goalie.status === 'Confirmed').map(goalie => goalie.name.split(' ')[1]);
    const confirmedFanduelGoalies = fanduelGoalies.filter(player =>
        confirmedGoalieLastNames.includes(player.name.split(' ')[1]));
    const goaliesGroupedByTeam = groupBy(fanduelGoalies, 'team');
    confirmedFanduelGoalies.forEach(async confirmedGoalie => {
        const goaliesFromThatTeam = goaliesGroupedByTeam[confirmedGoalie.team];
        goaliesFromThatTeam.forEach(goalie => {
            if (goalie.playerId !== confirmedGoalie.playerId)
                playerIdsToExclude.push(goalie.playerId)
        })
    });
    return playerIdsToExclude;
};

const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
    }, {});
};

exports.combineDataIntoPlayerPool = combineDataIntoPlayerPool;
exports.getFanduelPlayersFromSport = getFanduelPlayersFromSport;
exports.getPlayerIdsToExclude = getPlayerIdsToExclude;