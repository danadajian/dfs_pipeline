import {StartTime} from "../index";

export const convertStartTimesToLocal = (startTimes: StartTime[]) => {
    return startTimes.map((startTime: StartTime, id: number) => {
        const {sport, date} = startTime;
        const localDateTime = date.toLocaleString("en-GB", {timeZone: "America/Chicago", hour12: false});
        const localTimeWithSeconds = localDateTime.split(', ')[1];
        const time = localTimeWithSeconds.slice(0, localTimeWithSeconds.length - 3);
        return {
            id,
            sport,
            time
        }
    })
};
