import {sendOptimalLineupTextsHandler} from "./index";
import {generateTextMessageOutput} from './generateTextMessageOutput';
import {retrieveObjectFromS3, sendTextMessage} from '../aws/aws';

jest.mock('./generateTextMessageOutput');
jest.mock('../aws/aws');

(generateTextMessageOutput as jest.Mock).mockReturnValue('text message output');
(retrieveObjectFromS3 as jest.Mock).mockResolvedValue('retrieved object');
(sendTextMessage as jest.Mock).mockResolvedValue('text message sent');

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
        expect(generateTextMessageOutput).toHaveBeenCalledWith('a sport', 'retrieved object', 'Dan')
        expect(generateTextMessageOutput).toHaveBeenCalledWith('a sport', 'retrieved object', 'Tony')
    });

    it('should call sendTextMessage with correct file name', () => {
        expect(sendTextMessage).toHaveBeenCalledWith('text message output', process.env.DAN_PHONE_NUMBER);
        expect(sendTextMessage).toHaveBeenCalledWith('text message output', process.env.TONY_PHONE_NUMBER);
    });

    it('should return expected result',  () => {
        expect(result).toEqual('Text messages sent!');
    });
});