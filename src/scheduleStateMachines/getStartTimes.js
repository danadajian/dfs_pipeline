const axios = require('axios');
const xml2js = require('xml2js');
const SLATE_OFFSET_MINUTES = 20;

const getStartTimes = async (sports) => {
    let startTimes = {};
    return axios.get(`${process.env.FANDUEL_API_ROOT}?date=${getDateString()}`)
        .then(response => {return xml2js.parseStringPromise(response.data)})
        .then(result => {return result.data['fixturelist']})
        .then(apiResponse => {
            sports.forEach(sport => {
                const mainContest = apiResponse.filter(contest =>
                    contest.sport[0].toLowerCase() === sport && contest['game'][0].label[0] === 'Main')[0];
                const startTime = mainContest['game'][0].start[0] + ' PST';
                const startDate = new Date(startTime + ' PST');
                startTimes[sport] = new Date(startDate.getTime() - SLATE_OFFSET_MINUTES*60000);
            });
            return startTimes
        })
};

const getDateString = () => {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return year + '-' + month + '-' + day;
};

exports.getStartTimes = getStartTimes;
exports.getDateString = getDateString;
