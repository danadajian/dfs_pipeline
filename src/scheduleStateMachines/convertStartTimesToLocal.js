const convertStartTimesToLocal = (startTimes) => {
    let localStartTimes = {};
    Object.keys(startTimes).forEach(sport => {
        const startTimeUTC = startTimes[sport];
        const localDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}));
        const offset = new Date().getTime() - localDate.getTime();
        console.log(offset);
        console.log(offset/60000 + 'hours');
        const localStartTime = new Date(startTimeUTC.getTime() + offset*3600000);
        localStartTimes[sport] = localStartTime;
    });
    return localStartTimes;
};

exports.convertStartTimesToLocal = convertStartTimesToLocal;