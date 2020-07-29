import {MINUTES_AFTER_PIPELINE_START_TIME, STAGGER_MINUTES} from '../constants';
import {StartTime} from "../index";

export const staggerPipelineStartTimes = (startTimes: StartTime[]): StartTime[] => {
    const startTimesSeen: number[] = [];
    return startTimes.map((startTime: StartTime) => {
        const {date} = startTime;
        const time: number = date.getTime();
        const numberOfSameStartTimes = startTimesSeen.filter(startTime => startTime === time).length;
        startTimesSeen.push(time);
        date.setMinutes(date.getUTCMinutes() + MINUTES_AFTER_PIPELINE_START_TIME +
            numberOfSameStartTimes * STAGGER_MINUTES);
        return {
            ...startTime,
            date
        }
    })
};
