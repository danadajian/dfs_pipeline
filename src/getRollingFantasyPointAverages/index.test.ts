import {getRollingFantasyPointAverages} from "./index";
import {getCurrentData} from "./getCurrentData";
import {getFantasyData} from "./getFantasyData";
import {groupAndCalculateAverages} from "./groupAndCalculateAverages";

jest.mock('./getCurrentData');
jest.mock('./getFantasyData');
jest.mock('./groupAndCalculateAverages');

const mockFantasyData = [
    {
        "DraftKings": 2.2,
        "Fanduel": 1.7,
        "Name": "Kalen Ballage",
        "PlayerId": 123
    },
    {
        "DraftKings": 27.8,
        "Fanduel": 20.8,
        "Name": "Mark Andrews",
        "PlayerId": 456
    },
    {
        "DraftKings": 3.7,
        "Fanduel": 2.7,
        "Name": "Joe Mixon",
        "PlayerId": 789
    }
];

(getFantasyData as jest.Mock).mockResolvedValue(mockFantasyData);
(groupAndCalculateAverages as jest.Mock).mockResolvedValue('grouped players with averages');

describe('getRollingFantasyPointAverages', () => {
    const numberOfWeeks = 5;
    const event = {numberOfWeeks};

    describe('offseason case', () => {
        let result: any;

        beforeEach(async () => {
            (getCurrentData as jest.Mock).mockResolvedValue({
                "currentWeek": 0,
                "currentSeason": 1969
            });
            result = await getRollingFantasyPointAverages(event);
        });

        it('should call getCurrentWeek lambda with correct params', () => {
            expect(getCurrentData).toHaveBeenCalled()
        });

        it('should call getFantasyData lambda correct number of times', () => {
            expect(getFantasyData).toHaveBeenLastCalledWith({week: numberOfWeeks, season: 1968})
        });

        it.each([1, 2, 3, 4, 5])(
            'should call getFantasyData lambda with correct params', (week) => {
                expect(getFantasyData).toHaveBeenCalledWith({week, season: 1968})
            }
        );

        it('should call groupAndCalculateAverages with correct params', () => {
            expect(groupAndCalculateAverages).toHaveBeenCalledWith([
                mockFantasyData, mockFantasyData, mockFantasyData, mockFantasyData, mockFantasyData
            ])
        });

        it('should return expected result', () => {
            expect(result).toEqual('grouped players with averages')
        });
    });

    describe('mid season case', () => {
        let result: any;

        describe('currentWeek < numberOfWeeks', () => {

            beforeEach(async () => {
                (getCurrentData as jest.Mock).mockResolvedValue({
                    "currentWeek": 3,
                    "currentSeason": 1969
                });
                result = await getRollingFantasyPointAverages(event);
            });

            it('should call getCurrentWeek lambda with correct params', () => {
                expect(getCurrentData).toHaveBeenCalled()
            });

            it('should call getFantasyData lambda correct number of times', () => {
                expect(getFantasyData).toHaveBeenLastCalledWith({week: 3, season: 1969})
            });

            it.each([1, 2, 3])(
                'should call getFantasyData lambda with correct params up to currentWeek', (week) => {
                    expect(getFantasyData).toHaveBeenCalledWith({week, season: 1969})
                }
            );

            it('should call groupAndCalculateAverages with correct params', () => {
                expect(groupAndCalculateAverages).toHaveBeenCalledWith([
                    mockFantasyData, mockFantasyData, mockFantasyData
                ])
            });

            it('should return expected result', () => {
                expect(result).toEqual('grouped players with averages')
            });
        });

        describe('currentWeek >= numberOfWeeks', () => {
            beforeEach(async () => {
                (getCurrentData as jest.Mock).mockResolvedValue({
                    "currentWeek": 8,
                    "currentSeason": 1969
                });
                result = await getRollingFantasyPointAverages(event);
            });

            it('should call getCurrentWeek lambda with correct params', () => {
                expect(getCurrentData).toHaveBeenCalled()
            });

            it('should call getFantasyData lambda correct number of times', () => {
                expect(getFantasyData).toHaveBeenLastCalledWith({week: numberOfWeeks, season: 1969})
            });

            it.each([1, 2, 3, 4, 5])(
                'should call getFantasyData lambda with correct params up to numberOfWeeks', (week) => {
                    expect(getFantasyData).toHaveBeenCalledWith({
                        week,
                        season: 1969
                    })
                }
            );

            it('should call groupAndCalculateAverages with correct params', () => {
                expect(groupAndCalculateAverages).toHaveBeenCalledWith([
                    mockFantasyData, mockFantasyData, mockFantasyData, mockFantasyData, mockFantasyData
                ])
            });

            it('should return expected result', () => {
                expect(result).toEqual('grouped players with averages')
            });
        });
    });
});