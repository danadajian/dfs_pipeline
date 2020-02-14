const fs = require('fs');
const {combineDataIntoPlayerPool} = require("./combineDataIntoPlayerPool");
const {getFanduelPlayersFromSport} = require("./combineDataIntoPlayerPool");
const fanduelData = JSON.parse(fs.readFileSync('src/resources/testFanduelData.json'));
const projectionsData = JSON.parse(fs.readFileSync('src/resources/testProjectionsData.json'));

describe('merge data tests', () => {
    test('can get dfs player array from sport and fanduel data', () => {
        expect(getFanduelPlayersFromSport('nba', fanduelData)).toStrictEqual([
            {
                "name": "Brad Beal",
                "team": "WAS",
                "position": "SG",
                "salary": 10500,
                "playerId": 606912
            },
            {
                "name": "Luka Doncic",
                "team": "DAL",
                "position": "PG",
                "salary": 10300
            },
            {
                "name": "Kawhi Leonard",
                "team": "LAC",
                "position": "PF",
                "salary": 10100,
                "playerId": 512591
            }
        ])
    });

    test('can merge fanduel and projections data given sport', () => {
        expect(combineDataIntoPlayerPool('nba', fanduelData, projectionsData)).toStrictEqual([
            {
                "name": "Luka Doncic",
                "team": "DAL",
                "position": "PG",
                "salary": 10300,
                "playerId": 1121277,
                "projection": 0
            },
            {
                "name": "Kawhi Leonard",
                "team": "LAC",
                "position": "PF",
                "salary": 10100,
                "playerId": 512591,
                "projection": 46.26724
            },
        ]);
    });
});
