import {getCronExpressionFromDate, getTodayDateString} from './helpers';

const mockDate = new Date('4/20/2020');

// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => {
    return mockDate
});

describe('helpers', () => {
    describe('getTodayDateString', () => {
        let result: any;

        beforeEach(() => {
            result = getTodayDateString();
        });

        it("should return today's stringified date", function () {
            expect(result).toEqual('2020-04-20')
        });
    });

    describe('getCronExpressionFromDate', () => {
        let result: any;
        const date = new Date('4/20/2020 UTC');

        beforeEach(() => {
            result = getCronExpressionFromDate(date);
        });

        it("should return correct cron expression", () => {
            expect(result).toEqual('cron(0 4 20 4 ? 2020)')
        });
    });
});