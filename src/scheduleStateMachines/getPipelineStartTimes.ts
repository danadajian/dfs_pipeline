import {getTodayDateString} from '../helpers/helpers';
import {getPipelineStartTimeFromSlateStartTime} from "./getPipelineStartTimeFromSlateStartTime";
import '../env'
import * as axios from 'axios'
import * as xml2js from 'xml2js'
import {SUPPORTED_CONTESTS} from "../constants";

export const getPipelineStartTimes = async (sports: string[]): Promise<any> => {
    let startTimes: any = {};
    return axios.get(`${process.env.FANDUEL_API_ROOT}?date=${getTodayDateString()}`, {
        headers: {
            'User-Agent': null
        }
    }).then(response => {
            return xml2js.parseStringPromise(response.data)
        })
        .then(result => {
            const apiResponse = result.data['fixturelist'];
            sports.forEach(sport => {
                const mainContest = apiResponse.filter(contest =>
                    contest.sport[0].toLowerCase() === sport && SUPPORTED_CONTESTS.includes(contest['game'][0].label[0]))[0];
                if (mainContest) {
                    const startTime = mainContest['game'][0].start[0] + ' PST';
                    startTimes[sport] = getPipelineStartTimeFromSlateStartTime(startTime);
                }
            });
            return startTimes
        })
};
