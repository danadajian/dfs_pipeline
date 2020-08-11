import {SLATE_OFFSET_MINUTES} from "../constants";
import * as moment from "moment-timezone";

export const getPipelineCronExpression = (slateStartTimePST: string): string => {
    const pipelineStartTime = moment.tz(slateStartTimePST, 'YYYY-MM-DD HH:mm:ss', "America/Los_Angeles")
        .utc()
        .subtract(SLATE_OFFSET_MINUTES, 'minutes');
    return `cron(${pipelineStartTime.format('m H D M ? YYYY')})`;
};