import {PST_UTC_OFFSET_HOURS, SLATE_OFFSET_MINUTES} from "../constants";
import * as moment from "moment-timezone";

export const getPipelineCronExpression = (fanduelStartTime: string): string => {
    const pipelineStartTime = moment(fanduelStartTime)
        .add(PST_UTC_OFFSET_HOURS, 'hours')
        .subtract(SLATE_OFFSET_MINUTES, 'minutes');
    return `cron(${pipelineStartTime.format('m H D M ? YYYY')})`;
};