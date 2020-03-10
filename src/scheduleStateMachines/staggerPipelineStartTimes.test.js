const {staggerPipelineStartTimes} = require("./staggerPipelineStartTimes");

describe('stagger start times tests', () => {
    test('can stagger two different start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:30:00.000Z'),
            'nhl': new Date('2020-02-13T01:00:00.000Z')
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:50:00.000Z'),
            'nhl': new Date('2020-02-13T01:20:00.000Z')
        });
    });

    test('can stagger the same two start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:30:00.000Z'),
            'nhl': new Date('2020-02-12T23:30:00.000Z'),
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:50:00.000Z'),
            'nhl': new Date('2020-02-12T23:53:00.000Z'),
        });
    });

    test('can stagger some same and some different start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:30:00.000Z'),
            'nhl': new Date('2020-02-13T01:00:00.000Z'),
            'nfl': new Date('2020-02-12T23:30:00.000Z')
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:50:00.000Z'),
            'nhl': new Date('2020-02-13T01:20:00.000Z'),
            'nfl': new Date('2020-02-12T23:53:00.000Z')
        });
    });

    test('can stagger the same three start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:30:00.000Z'),
            'nhl': new Date('2020-02-12T23:30:00.000Z'),
            'nfl': new Date('2020-02-12T23:30:00.000Z'),
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:50:00.000Z'),
            'nhl': new Date('2020-02-12T23:53:00.000Z'),
            'nfl': new Date('2020-02-12T23:56:00.000Z'),
        });
    });

    test('can stagger the same four start times', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:30:00.000Z'),
            'nhl': new Date('2020-02-12T23:30:00.000Z'),
            'nfl': new Date('2020-02-12T23:30:00.000Z'),
            'mlb': new Date('2020-02-12T23:30:00.000Z'),
        };
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual({
            'nba': new Date('2020-02-12T23:50:00.000Z'),
            'nhl': new Date('2020-02-12T23:53:00.000Z'),
            'nfl': new Date('2020-02-12T23:56:00.000Z'),
            'mlb': new Date('2020-02-12T23:59:00.000Z'),
        });
    });
});