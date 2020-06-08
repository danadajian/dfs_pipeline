import * as _ from 'lodash'

export const groupAndCalculateAverages = async (fantasyData, site) => {
    return _.chain(fantasyData)
        .flatten()
        .groupBy("PlayerId")
        .map((value, key) => ({playerId: key, players: value}))
        .value()
        .map(playerObject => {
            return {
                "DraftKings": Number(_.meanBy(playerObject.players, "DraftKings").toFixed(1)),
                "Fanduel": Number(_.meanBy(playerObject.players, "Fanduel").toFixed(1)),
                "Name": playerObject.players[0].Name,
                "PlayerId": Number(playerObject.playerId)
            }
        })
        .sort((playerObj1: any, playerObj2: any) => playerObj2[site] - playerObj1[site]);
};