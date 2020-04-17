import {goalieScraperHandler} from './index'
import {GOALIE_WEBSITE_LINK} from "../constants";

const axios = require('axios');
const cheerio = require('cheerio');

jest.mock('axios');
jest.mock('cheerio');

const mockCheerio = jest.fn(() => {
    return {
        each: jest.fn()
    }
});

(axios.get as jest.Mock).mockResolvedValue({data: 'axios response'});
(cheerio.load as jest.Mock).mockReturnValue(mockCheerio);

describe('goalie scraper handler', () => {
    let result: any;

    beforeEach(async () => {
        result = await goalieScraperHandler();
    });

    it('should call axios get with goalie site link', () => {
        expect(axios.get).toHaveBeenCalledWith(GOALIE_WEBSITE_LINK)
    });

    it('should call cheerio load with correct params', () => {
        expect(cheerio.load).toHaveBeenCalledWith('axios response')
    });
});