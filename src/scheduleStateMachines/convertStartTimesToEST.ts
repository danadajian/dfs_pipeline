import {StartTime} from "../index";

export const convertStartTimesToEST = (startTimes: StartTime[]) => {
    return startTimes.map((startTime: StartTime, id: number) => {
        const {sport, date} = startTime;
        const time = date.toLocaleString('en-GB', {
            timeZone: 'America/New_York',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        return {
            id,
            sport,
            time
        }
    })
};
