import {scheduleStateMachinesHandler} from './index'
import {getPipelineStartTimes} from './getPipelineStartTimes';
import {convertStartTimesToEST} from './convertStartTimesToEST';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';

jest.mock('./getPipelineStartTimes');
jest.mock('./convertStartTimesToEST');
jest.mock('../aws/aws');

const mockPipelineStartTimes = [
    {
        sport: 'sport1',
        date: 'start time 1'
    },
    {
        sport: 'sport2',
        date: 'start time 2'
    }
];
(getPipelineStartTimes as jest.Mock).mockResolvedValue(mockPipelineStartTimes);
(convertStartTimesToEST as jest.Mock).mockResolvedValue('est start times');
(createCloudWatchEvent as jest.Mock).mockResolvedValue('event created');
(uploadObjectToS3 as jest.Mock).mockResolvedValue('start times uploaded');

describe('schedule state machines handler', () => {
   let result: any;
   const event = {
       sports: ['sport1', 'sport2']
   };

   beforeEach(async () => {
      result = await scheduleStateMachinesHandler(event);
   });

    it('should call getPipelineStartTimes with sports', () => {
        expect(getPipelineStartTimes).toHaveBeenCalledWith(['sport1', 'sport2'])
    });

    it('should call createCloudWatchEvent with correct params', () => {
        expect(createCloudWatchEvent).toHaveBeenCalledWith('sport1', 'start time 1');
        expect(createCloudWatchEvent).toHaveBeenCalledWith('sport2', 'start time 2')
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
