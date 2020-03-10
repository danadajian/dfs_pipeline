//import {MINUTES_AFTER_PIPELINE_START_TIME} from "../resources/constants";
const MINUTES_AFTER_PIPELINE_START_TIME = 20;
const _ = require('underscore');

const staggerPipelineStartTimes = (startTimes) => {
    const sports = Object.keys(startTimes);
    const startTimeCountMap = _.countBy(Object.values(startTimes));
    const startTimeCounterMap = {};
    Object.values(startTimes).forEach(startTime => startTimeCounterMap[startTime] = 0);
    sports.forEach(async (sport) => {
        const startTime = startTimes[sport];
        const startTimeCount = startTimeCountMap[startTime];
        let staggerMinutes;
        if (startTimeCount > 1) {
            staggerMinutes = MINUTES_AFTER_PIPELINE_START_TIME + (startTimeCounterMap[startTime] * 3);
            startTimeCounterMap[startTime] += 1;
        }
        else
            staggerMinutes = MINUTES_AFTER_PIPELINE_START_TIME;
        startTime.setMinutes(startTime.getUTCMinutes() + staggerMinutes);
        startTimes[sport] = startTime;
    });
    return startTimes;
};

exports.staggerPipelineStartTimes = staggerPipelineStartTimes;