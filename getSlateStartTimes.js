require('dotenv').config();
const axios = require('axios');
const xml2js = require('xml2js');

const getStartTimes = async (sports) => {
    let startTimes = {};
    const date = new Date();
    const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const dateString = `${date.getFullYear()}-${month}-${day}`;
    return axios.get(`${process.env.FANDUEL_API_ROOT}?date=${dateString}`)
        .then(response => {return xml2js.parseStringPromise(response.data)})
        .then(result => {return result.data['fixturelist']})
        .then(apiResponse => {
            sports.forEach(sport => {
                const mainContest = apiResponse.filter(contest =>
                    contest.sport[0].toLowerCase() === sport && contest['game'][0].label[0] === 'Main')[0];
                const startTime = mainContest['game'][0].start[0];
                startTimes[sport] = new Date(startTime + ' PST');
            });
            return startTimes
        })
};

exports.getStartTimes = getStartTimes;
