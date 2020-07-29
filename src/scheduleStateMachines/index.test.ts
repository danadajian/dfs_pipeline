import {scheduleStateMachinesHandler} from './index'
import {getPipelineStartTimes} from './getPipelineStartTimes';
import {convertStartTimesToLocal} from './convertStartTimesToLocal';
import {staggerPipelineStartTimes} from './staggerPipelineStartTimes';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';

jest.mock('./getPipelineStartTimes');
jest.mock('./convertStartTimesToLocal');
jest.mock('./staggerPipelineStartTimes');
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

(convertStartTimesToLocal as jest.Mock).mockResolvedValue('local start times');

(staggerPipelineStartTimes as jest.Mock).mockResolvedValue('staggered start times');

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

    it('should call staggerPipelineStartTimes with pipeline start times', () => {
        expect(staggerPipelineStartTimes).toHaveBeenCalledWith(mockPipelineStartTimes)
    });

    it('should call convertStartTimesToLocal with staggered start times', () => {
        expect(convertStartTimesToLocal).toHaveBeenCalledWith('staggered start times')
    });

    it('should call uploadObjectToS3 with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('local start times', 'startTimes.json')
    });

    it('should result expected result', () => {
        expect(result).toEqual('Events created!')
    });
});
