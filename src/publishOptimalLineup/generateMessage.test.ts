import {generateMessage} from './generateMessage';
import {getTimeOfDay} from "./getTimeOfDay";

jest.mock('./getTimeOfDay');

(getTimeOfDay as jest.Mock).mockReturnValue('day');

describe('generateMessage', () => {
    it('can generate message', () => {
        const optimalLineupData = {
            'lineup': [
                {
                    name: 'Joe Schmo',
                    team: 'CHI',
                    position: 'FB',
                    projection: 69
                },
                {
                    name: 'John Schmo',
                    team: 'NYG',
                    position: 'RB',
                    projection: 70.69
                },
                {
                    name: 'Joey Schmo',
                    team: 'PHI',
                    position: 'QB',
                    projection: 71.696969
                }],
            'totalProjection': 69.69696969,
            'totalSalary': 6900
        };
        const result = generateMessage('nfl', optimalLineupData);
        expect(result).toStrictEqual('Good day. Here is today\'s optimal NFL lineup:' +
            '\n\nJoe Schmo CHI FB\nProjection: 69.00' +
            '\n\nJohn Schmo NYG RB\nProjection: 70.69' +
            '\n\nJoey Schmo PHI QB\nProjection: 71.70' +
            '\n\nTotal projected points: 69.70' +
            '\nTotal salary: $6900'
        );
    });
});