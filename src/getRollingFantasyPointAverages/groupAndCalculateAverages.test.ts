import {groupAndCalculateAverages} from "./groupAndCalculateAverages";

describe('groupAndCalculateAverages', () => {
    describe('data exists case', () => {
        let result: any;
        const fantasyData = [
            [
                {
                    "DraftKings": 0.8,
                    "Fanduel": 1.0,
                    "Name": "Player 1",
                    "PlayerId": 123
                },
                {
                    "DraftKings": 69.6,
                    "Fanduel": 69.6,
                    "Name": "Player 69",
                    "PlayerId": 69
                },
                {
                    "DraftKings": 3.6,
                    "Fanduel": 2.8,
                    "Name": "Player 2",
                    "PlayerId": 456
                }
            ],
            [
                {
                    "DraftKings": 5.0,
                    "Fanduel": 9.0,
                    "Name": "Player 1",
                    "PlayerId": 123
                },
                {
                    "DraftKings": 27.8,
                    "Fanduel": 20.8,
                    "Name": "Player 2",
                    "PlayerId": 456
                },
                {
                    "DraftKings": 3.7,
                    "Fanduel": 2.7,
                    "Name": "Player 3",
                    "PlayerId": 789
                }
            ]
        ];

        beforeEach(async () => {
            result = await groupAndCalculateAverages(fantasyData, "Fanduel")
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    "DraftKings": 69.6,
                    "Fanduel": 69.6,
                    "Name": "Player 69",
                    "PlayerId": 69
                },
                {
                    "Name": "Player 2",
                    "DraftKings": 15.7,
                    "Fanduel": 11.8,
                    "PlayerId": 456
                },
                {
                    "Name": "Player 1",
                    "DraftKings": 2.9,
                    "Fanduel": 5.0,
                    "PlayerId": 123
                },
                {
                    "DraftKings": 3.7,
                    "Fanduel": 2.7,
                    "Name": "Player 3",
                    "PlayerId": 789
                }
            ])
        });
    });

    describe('data does not exist case', () => {
        let result: any;
        const fantasyData = [];

        beforeEach(async () => {
            result = await groupAndCalculateAverages(fantasyData, "any site")
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });
});