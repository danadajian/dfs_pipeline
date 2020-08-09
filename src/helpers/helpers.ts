import * as moment from 'moment-timezone'

export const getTodayDateString = (): string => {
    return moment().tz('America/New_York').format('YYYY-MM-DD');
};