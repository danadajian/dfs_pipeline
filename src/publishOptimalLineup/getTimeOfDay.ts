import * as moment from "moment";

export const getTimeOfDay = (): string => {
    const currentHour = Number(moment().utc().format('H'));
    return currentHour > 17 && currentHour < 22 ? 'afternoon' : currentHour > 5 && currentHour < 22 ? 'morning' : 'evening'
}