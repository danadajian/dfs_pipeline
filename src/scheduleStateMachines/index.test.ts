import {scheduleStateMachinesHandler} from './index'
import {getPipelineStartTimes} from './getPipelineStartTimes';
import {convertStartTimesToEST} from './convertStartTimesToEST';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';

jest.mock('./getPipelineStartTimes');
jest.mock('./convertStartTimesToEST');
jest.mock('../aws/aws');

const mockPipelineStartTimes = [
    {
        sport: 'mlb',
        date: 'start time 1'
    },
    {
        sport: 'nfl',
        date: 'start time 2'
    }
];
(getPipelineStartTimes as jest.Mock).mockResolvedValue(mockPipelineStartTimes);
(convertStartTimesToEST as jest.Mock).mockResolvedValue('est start times');
(createCloudWatchEvent as jest.Mock).mockResolvedValue('event created');
(uploadObjectToS3 as jest.Mock).mockResolvedValue('start times uploaded');

describe('schedule state machines handler', () => {
   let result: any;

   beforeEach(async () => {
      result = await scheduleStateMachinesHandler();
   });

    it('should call getPipelineStartTimes with sports', () => {
        expect(getPipelineStartTimes).toHaveBeenCalled()
    });

    it('should call createCloudWatchEvent with correct params', () => {
        expect(createCloudWatchEvent).toHaveBeenCalledWith('mlb', 'start time 1');
        expect(createCloudWatchEvent).toHaveBeenCalledWith('nfl', 'start time 2')
    });

    it('should call convertStartTimesToEST with start times', () => {
        expect(convertStartTimesToEST).toHaveBeenCalledWith(mockPipelineStartTimes)
    });

    it('should call uploadObjectToS3 with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('est start times', 'startTimes.json')
    });

    it('should result expected result', () => {
        expect(result).toEqual('Events created!')
    });
});
