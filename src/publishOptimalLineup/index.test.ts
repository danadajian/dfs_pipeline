import {publishOptimalLineupHandler} from "./index";
import {DFS_PIPELINE_BUCKET_NAME} from '@dadajian/shared-fantasy-constants';
import {generateMessage} from './generateMessage';
import {publishToSnsTopic, retrieveObjectFromS3} from "../aws/aws";

jest.mock('../aws/aws');
jest.mock('./generateMessage');

(generateMessage as jest.Mock).mockReturnValue('message');
(retrieveObjectFromS3 as jest.Mock).mockResolvedValue('retrieved object');
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
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'a sportOptimalLineup.json')
    });

    it('should call generateMessage with correct file name', () => {
        expect(generateMessage).toHaveBeenCalledWith('a sport', 'retrieved object')
        expect(generateMessage).toHaveBeenCalledWith('a sport', 'retrieved object')
    });

    it('should call publishToSnsTopic with correct file name', () => {
        expect(publishToSnsTopic).toHaveBeenCalledWith('message', process.env.OPTIMAL_LINEUP_TOPIC_ARN);
        expect(publishToSnsTopic).toHaveBeenCalledWith('message', process.env.OPTIMAL_LINEUP_TOPIC_ARN);
    });

    it('should return expected result',  () => {
        expect(result).toEqual('Message published successfully.');
    });
});