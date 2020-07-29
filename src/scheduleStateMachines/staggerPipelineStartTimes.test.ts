import {staggerPipelineStartTimes} from "./staggerPipelineStartTimes";

describe('stagger pipeline start times', () => {
    it('can stagger two different start times', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-13T01:00:00.000Z')
            }
        ];
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:50:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-13T01:20:00.000Z')
            }
        ]);
    });

    it('can stagger the same two start times', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-12T23:30:00.000Z')
            }
        ];
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:50:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-12T23:53:00.000Z')
            }
        ]);
    });

    it('can stagger some same and some different start times', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-13T01:00:00.000Z')
            },
            {
                sport: 'nfl',
                date: new Date('2020-02-12T23:30:00.000Z')
            }
        ];
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:50:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-13T01:20:00.000Z')
            },
            {
                sport: 'nfl',
                date: new Date('2020-02-12T23:53:00.000Z')
            }
        ]);
    });

    it('can stagger the same three start times', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nfl',
                date: new Date('2020-02-12T23:30:00.000Z')
            }
        ];
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:50:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-12T23:53:00.000Z')
            },
            {
                sport: 'nfl',
                date: new Date('2020-02-12T23:56:00.000Z')
            }
        ]);
    });

    it('can stagger the same four start times', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nfl',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'mlb',
                date: new Date('2020-02-12T23:30:00.000Z')
            }
        ];
        const result = staggerPipelineStartTimes(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:50:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-12T23:53:00.000Z')
            },
            {
                sport: 'nfl',
                date: new Date('2020-02-12T23:56:00.000Z')
            },
            {
                sport: 'mlb',
                date: new Date('2020-02-12T23:59:00.000Z')
            }
        ]);
    });
});