import {getCurrentData} from "./getCurrentData";
import {getFantasyData} from "./getFantasyData";
import {groupAndCalculateAverages} from "./groupAndCalculateAverages";
import {MAX_WEEKS_IN_SEASON} from "../constants";

export const getRollingFantasyPointAverages = async (event) => {
    const {numberOfWeeks} = event;
    return getCurrentData()
        .then(async (currentData) => {
            let {currentWeek, currentSeason} = currentData;

            const season = currentSeason - (currentWeek ? 0 : 1);
            currentWeek = currentWeek || MAX_WEEKS_IN_SEASON;
            const startingWeek = Math.max(1, currentWeek - numberOfWeeks);

            const allFantasyData = [];
            for (let week = startingWeek; week < currentWeek; week++) {
                const fantasyDataFromWeek = await getFantasyData({week, season});
                allFantasyData.push(fantasyDataFromWeek)
            }
            return allFantasyData
        })
        .then(allFantasyData => {
            return groupAndCalculateAverages(allFantasyData)
        })
};
