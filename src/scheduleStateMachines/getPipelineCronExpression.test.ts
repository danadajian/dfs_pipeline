import {getPipelineCronExpression} from "./getPipelineCronExpression";

describe('get pipeline start time from slate start time', () => {
    let result: any;
    const slateStart = '2020-04-17 10:30:00';

    beforeEach(async () => {
        result = getPipelineCronExpression(slateStart)
    });

    it('should return expected result', () => {
        expect(result).toEqual('cron(0 17 17 4 ? 2020)')
    });
});