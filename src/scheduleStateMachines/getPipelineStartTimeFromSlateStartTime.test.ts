import {getPipelineStartTimeFromSlateStartTime} from "./getPipelineStartTimeFromSlateStartTime";
import {SIXTY_SECONDS_IN_MILLISECONDS, SLATE_OFFSET_MINUTES} from "../constants";

const mockTimeValue = 69;
// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => {
    return {
        getTime: jest.fn().mockReturnValue(mockTimeValue)
    }
});

describe('get pipeline start time from slate start time', () => {
    let result: any;
    const startTime = '2020-04-17 10:30:00';

    beforeEach(async () => {
        result = getPipelineStartTimeFromSlateStartTime(startTime)
    });

    it('should construct the start date in PST', () => {
        expect(Date).toHaveBeenCalledWith('2020-04-17 10:30:00 PST')
    });

    it('should construct the correct resulting date object', () => {
        expect(Date).toHaveBeenCalledWith(mockTimeValue - SLATE_OFFSET_MINUTES * SIXTY_SECONDS_IN_MILLISECONDS)
    });
});