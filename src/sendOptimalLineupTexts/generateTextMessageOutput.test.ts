import {generateTextMessageOutput} from './generateTextMessageOutput';

describe('can generate text message output', () => {
    it('can generate text message output', () => {
        const optimalLineupData = {
            'lineup': [
                {
                    'name': 'Joe Schmo',
                    'team': 'CHI',
                    'position': 'FB'
                },
                {
                    'name': 'John Schmo',
                    'team': 'NYG',
                    'position': 'RB'
                },
                {
                    'name': 'Joey Schmo',
                    'team': 'PHI',
                    'position': 'QB'
                }],
            'totalProjection': 69.69696969,
            'totalSalary': 6900
        };
        const result = generateTextMessageOutput('nfl', optimalLineupData);
        expect(result).toStrictEqual('Good evening, Tony. Here is the optimal NFL lineup for tonight:' +
            '\nJoe Schmo CHI FB' +
            '\nJohn Schmo NYG RB' +
            '\nJoey Schmo PHI QB' +
            '\nTotal projected points: 69.70' +
            '\nTotal salary: $6900'
        );
    });
});