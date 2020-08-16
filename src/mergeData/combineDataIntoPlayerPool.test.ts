import {getPlayerIdsToExclude}  from './combineDataIntoPlayerPool';
import {combineDataIntoPlayerPool} from './combineDataIntoPlayerPool';
import {getFanduelPlayersFromSport} from './combineDataIntoPlayerPool';

const fanduelData = [
    {
        "contest": "Main",
        "players": [
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
        ],
        "sport": "NBA"
    }
];
const projectionsData = {
    "1121277": {
        "overUnder": 212.5,
        "gameDate": "Mon 7:00PM EST",
        "opponent": "@ Ind",
        "DraftKingsProjection": 0.0,
        "name": "Luka Doncic",
        "FanduelProjection": 0,
        "team": "Dal",
        "spread": "+5.5"
    },
    "512591": {
        "overUnder": 228.5,
        "gameDate": "Mon 10:30PM EST",
        "opponent": "v. SA",
        "DraftKingsProjection": 47.26493,
        "name": "Kawhi Leonard",
        "FanduelProjection": 46.26724,
        "team": "LAC",
        "spread": "-9.0"
    }
};

describe('merge data tests', () => {
    it('can get dfs player array from sport and fanduel data', () => {
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
            "name": "John Appleseed",
            "team": "EDM",
            "position": "G",
            "salary": 6969,
            "playerId": 69
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
        },
        {
            "name": "Joe Schmo",
            "team": "VGK",
            "position": "G",
            "salary": 6969,
            "playerId": 420
        }
    ];

    const goalieData = [
        {name: "Joe Schmo", status: "Confirmed"},
        {name: "Mike Smith", status: "Unconfirmed"}
    ];

    it('can return playerIds to exclude from fanduel data', () => {
        expect(getPlayerIdsToExclude(fanduelPlayers, goalieData)).toStrictEqual([229367]);
    });

    it('can merge fanduel and projections data', () => {
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
