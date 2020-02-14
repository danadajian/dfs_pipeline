const {staggerPipelineStartTimes} = require("./staggerPipelineStartTimes");

describe('stagger start times tests', () => {
    test('can stagger two different start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:40:00.000Z'),
            'nhl': new Date('2020-02-13T01:10:00.000Z')
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:45:00.000Z'),
            'nhl': new Date('2020-02-13T01:15:00.000Z')
        });
    });

    test('can stagger some different start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:40:00.000Z'),
            'nhl': new Date('2020-02-13T01:10:00.000Z'),
            'nfl': new Date('2020-02-12T23:40:00.000Z')
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:54:00.000Z'),
            'nhl': new Date('2020-02-13T01:15:00.000Z'),
            'nfl': new Date('2020-02-12T23:45:00.000Z')
        });
    });

    test('can stagger the same two start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:40:00.000Z'),
            'nhl': new Date('2020-02-12T23:40:00.000Z'),
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:54:00.000Z'),
            'nhl': new Date('2020-02-12T23:45:00.000Z'),
        });
    });

    test('can stagger the same three start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:40:00.000Z'),
            'nhl': new Date('2020-02-12T23:40:00.000Z'),
            'nfl': new Date('2020-02-12T23:40:00.000Z'),
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:51:00.000Z'),
            'nhl': new Date('2020-02-12T23:54:00.000Z'),
            'nfl': new Date('2020-02-12T23:45:00.000Z'),
        });
    });

    test('can stagger the same four start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:40:00.000Z'),
            'nhl': new Date('2020-02-12T23:40:00.000Z'),
            'nfl': new Date('2020-02-12T23:40:00.000Z'),
            'mlb': new Date('2020-02-12T23:40:00.000Z'),
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:48:00.000Z'),
            'nhl': new Date('2020-02-12T23:51:00.000Z'),
            'nfl': new Date('2020-02-12T23:54:00.000Z'),
            'mlb': new Date('2020-02-12T23:45:00.000Z'),
        });
    });
});