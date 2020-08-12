import {convertStartTimesToEasternTime} from './convertStartTimesToEasternTime';

describe('convertStartTimesToEST', () => {
    it('can convert start times to EST', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: '2020-12-01 15:30:00'
            },
            {
                sport: 'nhl',
                date: '2020-12-01 04:20:00'
            }
        ];
        const result = convertStartTimesToEasternTime(startTimes);
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

    it('can convert start times to EDT', () => {
        const startTimes = [
            {
                sport: 'nba',
                date: '2020-06-01 15:30:00'
            },
            {
                sport: 'nhl',
                date: '2020-06-01 04:20:00'
            }
        ];
        const result = convertStartTimesToEasternTime(startTimes);
        expect(result).toStrictEqual([
            {
                sport: 'nba',
                time: '7:30 PM EDT'
            },
            {
                sport: 'nhl',
                time: '8:20 AM EDT'
            }
        ]);
    });
});