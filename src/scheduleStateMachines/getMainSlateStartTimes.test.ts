import {getMainSlateStartTimes} from "./getMainSlateStartTimes";
import {getTodayDateString} from '../helpers/helpers';
import * as axios from 'axios';
import * as xml2js from 'xml2js';

jest.mock('../helpers/helpers');
jest.mock('axios');
jest.mock('xml2js');

const mockDate = new Date('4/20/2020 7:20');
// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

(getTodayDateString as jest.Mock).mockImplementation(() => {
    return 'mock date string'

});

(axios.get as jest.Mock).mockResolvedValue({data: 'axios response'});
(xml2js.parseStringPromise as jest.Mock).mockResolvedValue({
    data: {
        fixturelist: [
            {
                sport: ['MLB', 'NFL'],
                game: [
                    {
                        label: ['Main'],
                        start: ['2020-04-20 4:20:00']
                    }
                ]
            },
            {
                sport: ['invalid']
            }
        ]
    }
});

describe('get pipeline start times', () => {
    let result: any;

    beforeEach(async () => {
        result = await getMainSlateStartTimes();
    });

    it('should call axios get with correct url', () => {
        const url = `${process.env.FANDUEL_API_ROOT}?date=mock date string`;
        expect(axios.get).toHaveBeenCalledWith(url, {headers: {'User-Agent': null}})
    });

    it('should call xml2js with correct data', () => {
        expect(xml2js.parseStringPromise).toHaveBeenCalledWith('axios response')
    });

    it('should return correct start times', () => {
        expect(result).toEqual([
            {
                sport: 'mlb',
                date: mockDate
            }
        ]);
    });
});

