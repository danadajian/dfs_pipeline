import * as moment from "moment-timezone";
import {PST_UTC_OFFSET_HOURS, EASTERN_TIME_ZONE} from "../constants";
import {StartTime} from "@dadajian/shared-fantasy-constants";

export const convertStartTimesToEasternTime = (startTimes: StartTime[]) => {
    return startTimes.map((startTime: StartTime) => {
        const {sport, date} = startTime;
        const dateTimeUTC = moment(date)
            .add(PST_UTC_OFFSET_HOURS, 'hours')
            .format('YYYY-MM-DDTHH:mm:ss');
        const time = moment(`${dateTimeUTC}Z`)
            .tz(EASTERN_TIME_ZONE)
            .format('LT z');
        return {
            sport,
            time
        }
    })
};
