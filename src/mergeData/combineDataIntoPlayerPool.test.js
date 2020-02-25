const fs = require('fs');
const {filterOutUnprojectedGoaliesFromFanduelData} = require("./combineDataIntoPlayerPool");
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

    const fanduelPlayers = [
        {
            "name": "Leon Draisaitl",
            "team": "EDM",
            "position": "W",
            "salary": 8500,
            "playerId": 831068
        },
        {
            "name": "Jordan Binnington",
            "team": "STL",
            "position": "G",
            "salary": 8600,
            "playerId": 607980
        },
        {
            "name": "Marc-Andre Fleury",
            "team": "VGK",
            "position": "G",
            "salary": 8300,
            "playerId": 229367
        },
        {
            "name": "Mike Smith",
            "team": "EDM",
            "position": "G",
            "salary": 7900,
            "playerId": 172862
        }
    ];

    const projectedGoalies = [
        {name: "Marc-Andre Fleury", status: "Confirmed"},
        {name: "Joe Schmo", status: "Confirmed"},
        {name: "Mike Smith", status: "Unconfirmed"}
    ];

    test('can filter projectedGoalies out of fanduel data', () => {
        expect(filterOutUnprojectedGoaliesFromFanduelData(fanduelPlayers, projectedGoalies)).toStrictEqual([
            {
                "name": "Leon Draisaitl",
                "team": "EDM",
                "position": "W",
                "salary": 8500,
                "playerId": 831068
            },
            {
                "name": "Marc-Andre Fleury",
                "team": "VGK",
                "position": "G",
                "salary": 8300,
                "playerId": 229367,
                "status": "Confirmed"
            },
            {
                "name": "Mike Smith",
                "team": "EDM",
                "position": "G",
                "salary": 7900,
                "playerId": 172862,
                "status": "Unconfirmed"
            }
        ]);
    });

    test('can merge fanduel and projections data', () => {
        expect(combineDataIntoPlayerPool('nba', fanduelData, projectionsData, [])).toStrictEqual([
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
            }
        ]);
    });
});
