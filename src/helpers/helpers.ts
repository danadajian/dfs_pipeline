import * as moment from 'moment-timezone'
import {EASTERN_TIME_ZONE} from "../constants";

export const getTodayDateString = (): string => {
    return moment().tz(EASTERN_TIME_ZONE).format('YYYY-MM-DD');
};