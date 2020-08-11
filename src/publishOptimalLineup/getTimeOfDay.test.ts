import {getTimeOfDay} from "./getTimeOfDay";
import * as moment from "moment";

jest.mock('moment');

describe('getTimeOfDay', () => {
    describe('morning case', () => {
        let result: any;

        beforeEach(() => {
            (moment as any).mockImplementation(() => ({
                tz: jest.fn(() => ({
                    format: jest.fn(() => 17)
                }))
            }));
            result = getTimeOfDay()
        })

        it('should return expected result', () => {
            expect(result).toEqual('morning')
        });
    })

    describe('afternoon case', () => {
        let result: any;

        beforeEach(() => {
            (moment as any).mockImplementation(() => ({
                tz: jest.fn(() => ({
                    format: jest.fn(() => 18)
                }))
            }));
            result = getTimeOfDay()
        })

        it('should return expected result', () => {
            expect(result).toEqual('afternoon')
        });
    })

    describe('evening case', () => {
        let result: any;

        beforeEach(() => {
            (moment as any).mockImplementation(() => ({
                tz: jest.fn(() => ({
                    format: jest.fn(() => 22)
                }))
            }));
            result = getTimeOfDay()
        })

        it('should return expected result', () => {
            expect(result).toEqual('evening')
        });
    })

    afterEach(() => jest.clearAllMocks())
});