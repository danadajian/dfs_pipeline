import {mergeDataHandler} from './index';
import {DFS_PIPELINE_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {combineDataIntoPlayerPool} from './combineDataIntoPlayerPool';
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";

jest.mock("../aws/aws");
jest.mock('./combineDataIntoPlayerPool');

(retrieveObjectFromS3 as jest.Mock).mockImplementation((bucketName: string, fileName: string) => {
    return fileName === 'fanduelData.json' ? 'fanduel data' : 'projections data'
});
(uploadObjectToS3 as jest.Mock).mockResolvedValue('uploaded object');
(combineDataIntoPlayerPool as jest.Mock).mockResolvedValue('player pool');

describe('merge data handler', () => {
    let result: any;
    const event = {
        "invocationType": "pipeline",
        "date": "2020-02-20",
        "sport": "nba",
        "maxCombinations": 1000000000
    };

    beforeEach(async () => {
       result = await mergeDataHandler(event);
    });

    it('should call retrieveObjectFromS3 with correct file names', function () {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'fanduelData.json');
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'nbaProjectionsData.json');
    });

    it('should call combineDataIntoPlayerPool with correct params', () => {
        expect(combineDataIntoPlayerPool).toHaveBeenCalledWith('nba', 'fanduel data', 'projections data', [])
    });

    it('should call uploadObjectToS3 with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('player pool', DFS_PIPELINE_BUCKET_NAME, 'nbaPlayerPool.json')
    });

    it('should return the expected result', async () => {
        expect(result).toStrictEqual({
            "invocationType": "pipeline",
            "sport": "nba",
            "lineup": [
                {
                    "playerId": 0,
                    "position": "PG",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "PG",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "SG",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "SG",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "SF",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "SF",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "PF",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "PF",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                },
                {
                    "playerId": 0,
                    "position": "C",
                    "team": "",
                    "name": "",
                    "projection": "",
                    "salary": ""
                }
            ],
            "blackList": [],
            "lineupPositions": ["PG", "PG", "SG", "SG", "SF", "SF", "PF", "PF", "C"],
            "lineupRestrictions": {
                "distinctTeamsRequired": 3,
                "maxPlayersPerTeam": 4,
                "teamAgnosticPosition": ""
            },
            "salaryCap": 60000,
            "maxCombinations": 1000000000
        })
    });
});