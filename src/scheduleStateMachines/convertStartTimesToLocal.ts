export const convertStartTimesToLocal = (startTimes) => {
    let localStartTimes = {};
    Object.keys(startTimes).forEach(sport => {
        const startTimeUTC = startTimes[sport];
        const localDateTime = startTimeUTC.toLocaleString("en-GB", {timeZone: "America/Chicago", hour12: false});
        const localTimeWithSeconds = localDateTime.split(', ')[1];
        localStartTimes[sport] = localTimeWithSeconds.slice(0, localTimeWithSeconds.length - 3);
    });
    return localStartTimes;
};
