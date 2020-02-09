const fs = require('fs');
const fanduelData = JSON.parse(fs.readFileSync('./testFanduelData.json'));
const projectionsData = JSON.parse(fs.readFileSync('./testProjectionsData.json'));
const aws = require('./aws');
jest.mock('./aws');

describe('testing s3 retrieval', () => {
    test('retrieves fanduel object', async () => {
        const result = await aws.retrieveObjectFromS3('fanduelData.json');
        expect(result).toStrictEqual(fanduelData);
    });

    test('retrieves projections object', async () => {
        const result = await aws.retrieveObjectFromS3('nbaProjectionsData.json');
        expect(result).toStrictEqual(projectionsData);
    });

    test('uploads player pool object', async () => {
        const playerPool = [
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
        ];
        const result = await aws.uploadObjectToS3(playerPool, 'nbaPlayerPool.json');
        expect(result).toStrictEqual('File uploaded successfully.');
    });
});