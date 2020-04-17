import {getTodayDateString} from './helpers';

const mockDate = new Date('4/20/2020');

// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => {
    return mockDate
});

describe('helpers', () => {
   let result: any;

   beforeEach(() => {
       result = getTodayDateString();
   });

    it("should return today's stringified date", function () {
        expect(result).toEqual('2020-04-20')
    });
});