import {scheduleStateMachinesHandler} from './index'
import {convertStartTimesToEasternTime} from './convertStartTimesToEasternTime';
import {DFS_PIPELINE_BUCKET_NAME} from '@dadajian/shared-fantasy-constants';
import {getMainSlateFanduelStartTimes} from "./getMainSlateFanduelStartTimes";
import {getPipelineCronExpression} from "./getPipelineCronExpression";
import {getCloudWatchParams} from "./getCloudWatchParams";
import {createCloudWatchEvent, uploadObjectToS3} from "../aws/aws";

jest.mock('./getMainSlateFanduelStartTimes');
jest.mock('./getPipelineCronExpression');
jest.mock('./getCloudWatchParams');
jest.mock('./convertStartTimesToEasternTime');
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
(getMainSlateFanduelStartTimes as jest.Mock).mockResolvedValue(mockSlateStartTimes);
(getPipelineCronExpression as jest.Mock).mockReturnValue('pipeline start time');
(getCloudWatchParams as jest.Mock).mockImplementation((sport: string) => {
    if (sport === 'mlb')
        return {
            putRuleParams: 'mlb put params',
            putTargetsParams: 'mlb targets params'
        }
    else
        return {
            putRuleParams: 'nfl put params',
            putTargetsParams: 'nfl targets params'
        }
});
(convertStartTimesToEasternTime as jest.Mock).mockReturnValue('est start times');
(createCloudWatchEvent as jest.Mock).mockResolvedValue('event created');
(uploadObjectToS3 as jest.Mock).mockResolvedValue('start times uploaded');

describe('schedule state machines handler', () => {
   let result: any;

   beforeEach(async () => {
      result = await scheduleStateMachinesHandler();
   });

    it('should call getMainSlateStartTimes', () => {
        expect(getMainSlateFanduelStartTimes).toHaveBeenCalled()
    });

    it('should call getPipelineStartTime with correct params', () => {
        expect(getPipelineCronExpression).toHaveBeenCalledWith('start time 1')
        expect(getPipelineCronExpression).toHaveBeenCalledWith('start time 2')
    });

    it('should call getCloudWatchParams with correct params', () => {
        expect(getCloudWatchParams).toHaveBeenCalledWith('mlb', 'pipeline start time')
        expect(getCloudWatchParams).toHaveBeenCalledWith('nfl', 'pipeline start time')
    });

    it('should call createCloudWatchEvent with correct params', () => {
        expect(createCloudWatchEvent).toHaveBeenCalledWith('mlb put params', 'mlb targets params');
        expect(createCloudWatchEvent).toHaveBeenCalledWith('nfl put params', 'nfl targets params');
    });

    it('should call convertStartTimesToEST with start times', () => {
        expect(convertStartTimesToEasternTime).toHaveBeenCalledWith(mockSlateStartTimes)
    });

    it('should call uploadObjectToS3 with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('est start times', DFS_PIPELINE_BUCKET_NAME, 'startTimes.json')
    });

    it('should result expected result', () => {
        expect(result).toEqual('Events created!')
    });
});
