import {publishOptimalLineupHandler} from "./index";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from '@dadajian/shared-fantasy-constants';
import {generateMessage} from './generateMessage';
import {publishToSnsTopic, retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {getTodayDateString} from "../helpers/helpers";

jest.mock('../aws/aws');
jest.mock('./generateMessage');
jest.mock('../helpers/helpers');

(generateMessage as jest.Mock).mockReturnValue('message');
(getTodayDateString as jest.Mock).mockReturnValue('date');
(retrieveObjectFromS3 as jest.Mock).mockImplementation(async (bucketName: string) => {
    return bucketName === FANTASY_ANALYTICS_BUCKET_NAME ? ['past lineups'] : {lineup: 'new lineup'}
});
(uploadObjectToS3 as jest.Mock).mockResolvedValue('uploaded object');
(publishToSnsTopic as jest.Mock).mockResolvedValue('message published');

describe('publish optimal lineup', () => {
   let result: any;
   const event = {
       sport: 'a sport'
   };

   beforeEach(async () => {
      result = await publishOptimalLineupHandler(event);
   });

    it('should call retrieveObjectFromS3 with correct file name', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'a sportRecentOptimalLineups.json')
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'a sportOptimalLineup.json')
    });

    it('should call uploadObjectToS3 with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith([
            'past lineups',
            {
                date: 'date',
                lineup: 'new lineup'
            }
        ], FANTASY_ANALYTICS_BUCKET_NAME, 'a sportRecentOptimalLineups.json')
    });

    it('should call generateMessage with correct file name', () => {
        expect(generateMessage).toHaveBeenCalledWith('a sport', {lineup: 'new lineup'})
    });

    it('should call publishToSnsTopic with correct file name', () => {
        expect(publishToSnsTopic).toHaveBeenCalledWith('message', process.env.OPTIMAL_LINEUP_TOPIC_ARN);
    });

    it('should return expected result',  () => {
        expect(result).toEqual('Message published successfully.');
    });
});