import {invokeLambdaFunction} from "../aws/aws";
import {getCurrentData} from "./getCurrentData";

jest.mock('../aws/aws');

(invokeLambdaFunction as jest.Mock).mockResolvedValue('lambda return value');

describe('getCurrentData', () => {
    let result: any;
    beforeEach(async () => {
        result = await getCurrentData();
    });

    it('should call invoke lambda with correct params', () => {
        expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.GET_CURRENT_DATA_LAMBDA_NAME)
    });

    it('should return expected result', () => {
        expect(result).toEqual('lambda return value')
    });
});