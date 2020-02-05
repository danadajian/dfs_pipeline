exports.handler = function(event, context) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    return 'test'
};

exports.getFanduelPlayersFromSport = function(sport, fanduelData) {
    return fanduelData.filter(
        contestObject =>
            contestObject['contest'] === 'Main' &&
            contestObject['sport'].toLowerCase() === sport)[0]['players']
};

// exports.mergeData = function(fanduelData, projectionsData) {
//     let combinedData = [];
//     dfsPlayers.forEach(player => {
//         if (!player.playerId)
//             player.playerId = parseInt(
//                 Object.keys(projectionsData)
//                     .filter(playerId => projectionsData[playerId].name === player.name)[0]
//             );
//         let playerData = projectionsData[player.playerId];
//         if (playerData) {
//             player.name = playerData.name;
//             player.team = playerData.team;
//             player.opponent = playerData.opponent;
//             player.gameDate = playerData.gameDate;
//             player.spread = playerData['spread'];
//             player.overUnder = playerData.overUnder;
//             player.projection = playerData[site + 'Projection'];
//             combinedData.push(player);
//         }
//     });
//     return combinedData;
// };