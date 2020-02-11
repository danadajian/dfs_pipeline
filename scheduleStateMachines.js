const getSlateStartTimes = require('./getSlateStartTimes');

exports.handler = async (event) => {
    const startTimes = await getSlateStartTimes.getStartTimes(event.sports);
    console.log(startTimes);
};

exports.handler({"sports": ['nba', 'nhl']});
