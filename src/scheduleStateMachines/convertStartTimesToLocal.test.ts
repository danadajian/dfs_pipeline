import {convertStartTimesToLocal} from './convertStartTimesToLocal';

describe('can convert start times to local', () => {
    it('can convert start times to local', () => {
        const startTimes = {
            'nba': new Date('2020-02-12T23:30:00.000Z'),
            'nhl': new Date('2020-02-13T01:10:00.000Z')
        };
        const result = convertStartTimesToLocal(startTimes);
        expect(result).toStrictEqual({
            'nba': '17:30',
            'nhl': '19:10'
        });
    });
});