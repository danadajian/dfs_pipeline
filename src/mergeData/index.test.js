const mergeData = require('./index');
const fs = require('fs');
const optimizerInput = JSON.parse(fs.readFileSync('src/resources/testOptimizerInput.json'));
jest.mock('../aws');

describe('handler tests', () => {
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