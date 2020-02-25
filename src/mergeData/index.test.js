const mergeData = require('./index');
const fs = require('fs');
const optimizerInput = JSON.parse(fs.readFileSync('src/resources/testOptimizerInput.json'));
const {handler} = require('../goalieScraper/index');
jest.mock('../aws');
jest.mock('../goalieScraper/index');

describe('handler tests', () => {

    handler.mockResolvedValue([]);

    test('can handle input', async () => {
        const event = {
            "invocationType": "pipeline",
            "date": "2020-02-20",
            "sport": "nba",
            "maxCombinations": 1000000000
        };
        const result = await mergeData.handler(event);
        expect(result).toStrictEqual(optimizerInput)
    });
});