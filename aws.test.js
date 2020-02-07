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
});