import {StartTime} from "../index";
import * as moment from "moment-timezone";
import {PST_UTC_OFFSET_HOURS} from "../constants";

export const convertStartTimesToEasternTime = (startTimes: StartTime[]) => {
    return startTimes.map((startTime: StartTime) => {
        const {sport, date} = startTime;
        const dateTimeUTC = moment(date)
            .add(PST_UTC_OFFSET_HOURS, 'hours')
            .format('YYYY-MM-DDTHH:mm:ss');
        const time = moment(`${dateTimeUTC}Z`)
            .tz('America/New_York')
            .format('LT z');
        return {
            sport,
            time
        }
    })
};
