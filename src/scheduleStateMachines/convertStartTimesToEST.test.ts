import {convertStartTimesToEST} from './convertStartTimesToEST';

describe('can convert start times to local', () => {
    it('can convert start times to local', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: new Date('2020-02-12T23:30:00.000Z')
            },
            {
                sport: 'nhl',
                date: new Date('2020-02-13T01:10:00.000Z')
            }
        ];
        const result = convertStartTimesToEST(startTimes);
        expect(result).toStrictEqual([
            {
                id: 0,
                sport: 'nba',
                time: '6:30 PM EST'
            },
            {
                id: 1,
                sport: 'nhl',
                time: '8:10 PM EST'
            }
        ]);
    });
});