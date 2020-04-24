import {invokeLambdaFunction} from "../aws/aws";
import {getFantasyData} from "./getFantasyData";

jest.mock('../aws/aws');

(invokeLambdaFunction as jest.Mock).mockResolvedValue('lambda return value');

describe('getFantasyData', () => {
    let result: any;
    const payload = {
        week: 'a week',
        season: 'a season'
    };
    beforeEach(async () => {
        result = await getFantasyData(payload);
    });

    it('should call invoke lambda with correct params', () => {
        expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.GET_FANTASY_DATA_LAMBDA_NAME, payload)
    });

    it('should return expected result', () => {
        expect(result).toEqual('lambda return value')
    });
});