import {convertStartTimesToEST} from './convertStartTimesToEST';

describe('can convert start times to local', () => {
    it('can convert start times to local', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: '2020-02-12 15:30:00'
            },
            {
                sport: 'nhl',
                date: '2020-02-12 04:20:00'
            }
        ];
        const result = convertStartTimesToEST(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                time: '6:30 PM EST'
            },
            {
                sport: 'nhl',
                time: '7:20 AM EST'
            }
        ]);
    });
});