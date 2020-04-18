import {getCronExpressionFromDate, getTodayDateString} from './helpers';

// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => {
    return {
        toLocaleString: jest.fn(() => '4/20/2020, 04:20:00 PM'),
        getDate: jest.fn(() => 20),
        getMonth: jest.fn(() => 3),
        getFullYear: jest.fn(() => 2020),
        getUTCMinutes: jest.fn(() => 1),
        getUTCHours: jest.fn(() => 2),
        getUTCDate: jest.fn(() => 3),
        getUTCMonth: jest.fn(() => 4),
        getUTCFullYear: jest.fn(() => 1969)
    }
});

describe('helpers', () => {
    describe('getTodayDateString', () => {
        let result: any;

        beforeEach(() => {
            result = getTodayDateString();
        });

        it("should return today's stringified date", () => {
            expect(result).toEqual('2020-04-20')
        });
    });

    describe('getCronExpressionFromDate', () => {
        let result: any;
        const date = new Date();

        beforeEach(() => {
            result = getCronExpressionFromDate(date);
        });

        it("should return correct cron expression", () => {
            expect(result).toEqual('cron(1 2 3 5 ? 1969)')
        });
    });
});