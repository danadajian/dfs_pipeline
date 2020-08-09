import {getTodayDateString} from './helpers';
import * as moment from "moment-timezone";

jest.mock('moment-timezone');

(moment as any).mockImplementation(() => ({
    tz: jest.fn(() => ({
        format: jest.fn(() => '2020-04-20')
    }))
}));

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
});