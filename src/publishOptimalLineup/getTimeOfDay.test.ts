import {getTimeOfDay} from "./getTimeOfDay";

describe('getTimeOfDay', () => {
    describe('morning case', () => {
        let result: any;

        beforeEach(() => {
            // @ts-ignore
            jest.spyOn(global, 'Date').mockImplementation(() => {
                return {
                    getUTCHours: jest.fn(() => 17)
                }
            });
            result = getTimeOfDay()
        })

        it('should return expected result', () => {
            expect(result).toEqual('morning')
        });
    })

    describe('afternoon case', () => {
        let result: any;

        beforeEach(() => {
            // @ts-ignore
            jest.spyOn(global, 'Date').mockImplementation(() => {
                return {
                    getUTCHours: jest.fn(() => 18)
                }
            });
            result = getTimeOfDay()
        })

        it('should return expected result', () => {
            expect(result).toEqual('afternoon')
        });
    })

    describe('evening case', () => {
        let result: any;

        beforeEach(() => {
            // @ts-ignore
            jest.spyOn(global, 'Date').mockImplementation(() => {
                return {
                    getUTCHours: jest.fn(() => 2)
                }
            });
            result = getTimeOfDay()
        })

        it('should return expected result', () => {
            expect(result).toEqual('evening')
        });
    })

    afterEach(() => jest.clearAllMocks())
});