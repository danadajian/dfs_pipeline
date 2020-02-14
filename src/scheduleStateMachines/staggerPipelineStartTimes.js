// import {SLATE_OFFSET_MINUTES} from "../resources/constants";
const _ = require("underscore");
const SLATE_OFFSET_MINUTES = 20;

const staggerPipelineStartTimes = (startTimes) => {
    const sports = Object.keys(startTimes);
    sports.forEach(sport => {
        const startTime = startTimes[sport];
        const startTimeCount = _.countBy(Object.values(startTimes))[startTime];
        let staggerMinutes;
        if (startTimeCount > 1)
            staggerMinutes = Math.floor(SLATE_OFFSET_MINUTES - (startTimeCount * 3));
        else
            staggerMinutes = 5;
        startTime.setMinutes(startTime.getUTCMinutes() + staggerMinutes);
        startTimes[sport] = startTime;
    });
    return startTimes;
};

exports.staggerPipelineStartTimes = staggerPipelineStartTimes;