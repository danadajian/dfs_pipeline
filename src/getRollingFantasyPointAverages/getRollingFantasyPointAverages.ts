import {getCurrentData} from "./getCurrentData";
import {getFantasyData} from "./getFantasyData";
import * as _ from 'lodash';

export const getRollingFantasyPointAverages = async (numberOfWeeks: number) => {
    return getCurrentData()
        .then(async (currentData) => {
            const {currentWeek, currentSeason} = currentData;

            const numberOfWeeksToUse = currentWeek > 0 ? Math.min(currentWeek, numberOfWeeks) : numberOfWeeks;
            const season = currentSeason - (currentWeek === 0 ? 1 : 0);

            const allFantasyData = [];
            for (let week = 1; week <= numberOfWeeksToUse; week++) {
                const fantasyData = await getFantasyData({week, season});
                allFantasyData.push(fantasyData)
            }
            return allFantasyData
        })
};
