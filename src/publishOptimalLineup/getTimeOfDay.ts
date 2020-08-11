import * as moment from "moment-timezone";

export const getTimeOfDay = (): string => {
    const currentHour = Number(moment().tz('UTC').format('H'));
    return currentHour > 17 && currentHour < 22 ? 'afternoon' : currentHour > 5 && currentHour < 22 ? 'morning' : 'evening'
}