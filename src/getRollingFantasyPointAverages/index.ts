import {getCurrentData} from "./getCurrentData";
import {getFantasyData} from "./getFantasyData";
import {groupAndCalculateAverages} from "./groupAndCalculateAverages";

export const getRollingFantasyPointAverages = async (event) => {
    const {numberOfWeeks} = event;
    return getCurrentData()
        .then(async (currentData) => {
            const {currentWeek, currentSeason} = currentData;

            const numberOfWeeksToUse = currentWeek > 0 ? Math.min(currentWeek, numberOfWeeks) : numberOfWeeks;
            const season = currentSeason - (currentWeek === 0 ? 1 : 0);

            const allFantasyData = [];
            for (let week = 1; week <= numberOfWeeksToUse; week++) {
                const fantasyDataFromWeek = await getFantasyData({week, season});
                allFantasyData.push(fantasyDataFromWeek)
            }
            return allFantasyData
        })
        .then(allFantasyData => {
            return groupAndCalculateAverages(allFantasyData)
        })
};
