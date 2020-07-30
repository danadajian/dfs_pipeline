import {retrieveObjectFromS3} from "../aws/aws";
import {retrieveFromS3Handler} from "./index";

jest.mock("../aws/aws");

(retrieveObjectFromS3 as jest.Mock).mockResolvedValue('retrieved object')

describe('retrieveFromS3', () => {
    let result: any;
    const event = {
        fileName: 'fileName'
    }

    beforeEach(async () => {
        result = await retrieveFromS3Handler(event)
    })

    it('should call retrieveObjectFromS3 with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith('fileName')
    });

    it('should return the expected result', () => {
        expect(result).toEqual('retrieved object')
    });
})