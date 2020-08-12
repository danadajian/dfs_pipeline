import * as axios from "axios";
import {getTodayDateString} from "../helpers/helpers";
import * as xml2js from "xml2js";
import {StartTime} from "../index";
import {SUPPORTED_CONTESTS, SUPPORTED_SPORTS} from "@dadajian/shared-fantasy-constants";

export const getMainSlateFanduelStartTimes = (): Promise<StartTime[]> => {
    let startTimes: StartTime[] = [];
    return axios.get(`${process.env.FANDUEL_API_ROOT}?date=${getTodayDateString()}`, {
        headers: {
            'User-Agent': null
        }
    }).then(response => {
        return xml2js.parseStringPromise(response.data)
    })
        .then(result => {
            const apiResponse = result.data.fixturelist;
            SUPPORTED_SPORTS.forEach(sport => {
                const mainContest = apiResponse.filter(contest =>
                    contest.sport[0].toLowerCase() === sport && SUPPORTED_CONTESTS.includes(contest.game[0].label[0]))[0];
                if (mainContest) {
                    const date = mainContest.game[0].start[0];
                    startTimes.push({
                        sport,
                        date
                    });
                }
            });
            return startTimes
        })
}