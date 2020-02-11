const fs = require('fs');
const fanduelApiResponse = JSON.parse(fs.readFileSync('./testFanduelApiResponse.json'));
const getSlateStartTimes = require('./getSlateStartTimes');
// jest.mock('axios');
// jest.mock('xml2js');
//
// (axios as jest.Mock).mockReturnValue()

describe('get slate start times tests', () => {
    test('can call API', async () => {
        const result = await getSlateStartTimes.getStartTimes();
        expect(result).toStrictEqual(fanduelApiResponse)
    });
});