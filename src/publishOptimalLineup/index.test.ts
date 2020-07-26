import {publishOptimalLineupHandler} from "./index";
import {generateMessage} from './generateMessage';
import {retrieveObjectFromS3, publishToSnsTopic} from '../aws/aws';

jest.mock('./generateMessage');
jest.mock('../aws/aws');

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
        expect(retrieveObjectFromS3).toHaveBeenCalledWith('a sportOptimalLineup.json')
    });

    it('should call generateMessage with correct file name', () => {
        expect(generateMessage).toHaveBeenCalledWith('a sport', 'retrieved object')
        expect(generateMessage).toHaveBeenCalledWith('a sport', 'retrieved object')
    });

    it('should call publishToSnsTopic with correct file name', () => {
        expect(publishToSnsTopic).toHaveBeenCalledWith('message');
        expect(publishToSnsTopic).toHaveBeenCalledWith('message');
    });

    it('should return expected result',  () => {
        expect(result).toEqual('Message published successfully.');
    });
});