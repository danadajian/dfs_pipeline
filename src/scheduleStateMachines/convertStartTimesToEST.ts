import {StartTime} from "../index";
import * as moment from "moment-timezone";

export const convertStartTimesToEST = (startTimes: StartTime[]) => {
    return startTimes.map((startTime: StartTime) => {
        const {sport, date} = startTime;
        const time = moment.tz(date, 'YYYY-MM-DD HH:mm:ss', 'America/Los_Angeles')
            .tz('America/New_York')
            .format('LT z');
        return {
            sport,
            time
        }
    })
};
