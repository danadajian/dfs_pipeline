import {scheduleStateMachinesHandler} from './index'
import {convertStartTimesToEST} from './convertStartTimesToEST';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';
import {getMainSlateStartTimes} from "./getMainSlateStartTimes";
import {getPipelineStartTime} from "./getPipelineStartTime";

jest.mock('./getMainSlateStartTimes');
jest.mock('./getPipelineStartTime');
jest.mock('./convertStartTimesToEST');
jest.mock('../aws/aws');

const mockSlateStartTimes = [
    {
        sport: 'mlb',
        date: 'start time 1'
    },
    {
        sport: 'nfl',
        date: 'start time 2'
    }
];
(getMainSlateStartTimes as jest.Mock).mockResolvedValue(mockSlateStartTimes);
(getPipelineStartTime as jest.Mock).mockReturnValue('pipeline start time');
(convertStartTimesToEST as jest.Mock).mockReturnValue('est start times');
(createCloudWatchEvent as jest.Mock).mockResolvedValue('event created');
(uploadObjectToS3 as jest.Mock).mockResolvedValue('start times uploaded');

describe('schedule state machines handler', () => {
   let result: any;

   beforeEach(async () => {
      result = await scheduleStateMachinesHandler();
   });

    it('should call getPipelineStartTimes with sports', () => {
        expect(getMainSlateStartTimes).toHaveBeenCalled()
    });

    it('should call createCloudWatchEvent with correct params', () => {
        expect(createCloudWatchEvent).toHaveBeenCalledWith('mlb', 'pipeline start time');
        expect(createCloudWatchEvent).toHaveBeenCalledWith('nfl', 'pipeline start time')
    });

    it('should call convertStartTimesToEST with start times', () => {
        expect(convertStartTimesToEST).toHaveBeenCalledWith(mockSlateStartTimes)
    });

    it('should call uploadObjectToS3 with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('est start times', 'startTimes.json')
    });

    it('should result expected result', () => {
        expect(result).toEqual('Events created!')
    });
});
