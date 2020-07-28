import {generateMessage} from './generateMessage';

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
        expect(result).toStrictEqual('Good evening. Here is the optimal NFL lineup for tonight:' +
            '\n\nJoe Schmo CHI FB\nProjection: 69.00' +
            '\n\nJohn Schmo NYG RB\nProjection: 70.69' +
            '\n\nJoey Schmo PHI QB\nProjection: 71.70' +
            '\n\nTotal projected points: 69.70' +
            '\nTotal salary: $6900'
        );
    });
});