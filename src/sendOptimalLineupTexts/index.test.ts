import {sendOptimalLineupTextsHandler} from "./index";
import {generateTextMessageOutput} from './generateTextMessageOutput';
import {retrieveObjectFromS3, publishToSnsTopic} from '../aws/aws';

jest.mock('./generateTextMessageOutput');
jest.mock('../aws/aws');

(generateTextMessageOutput as jest.Mock).mockReturnValue('text message output');
(retrieveObjectFromS3 as jest.Mock).mockResolvedValue('retrieved object');
(publishToSnsTopic as jest.Mock).mockResolvedValue('text message sent');

describe('send optimal lineup texts', () => {
   let result: any;
   const event = {
       sport: 'a sport'
   };

   beforeEach(async () => {
      result = await sendOptimalLineupTextsHandler(event);
   });

    it('should call retrieveObjectFromS3 with correct file name', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith('a sportOptimalLineup.json')
    });

    it('should call generateTextMessageOutput with correct file name', () => {
        expect(generateTextMessageOutput).toHaveBeenCalledWith('a sport', 'retrieved object')
        expect(generateTextMessageOutput).toHaveBeenCalledWith('a sport', 'retrieved object')
    });

    it('should call sendTextMessage with correct file name', () => {
        expect(publishToSnsTopic).toHaveBeenCalledWith('text message output');
        expect(publishToSnsTopic).toHaveBeenCalledWith('text message output');
    });

    it('should return expected result',  () => {
        expect(result).toEqual('Text messages sent!');
    });
});