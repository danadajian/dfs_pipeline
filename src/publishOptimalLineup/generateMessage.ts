import {getTimeOfDay} from "./getTimeOfDay";

export const generateMessage = (sport: string, optimalLineupData: any): string => {
    return `Good ${getTimeOfDay()}. Here is today's optimal ${sport.toUpperCase()} lineup:` +
        optimalLineupData.lineup.map(player =>
            `\n\n${player.name} ${player.team} ${player.position}`
            + `\nProjection: ${player.projection.toFixed(2)}`).join('')
        + `\n\nTotal projected points: ${optimalLineupData.totalProjection.toFixed(2)}`
        + `\nTotal salary: $${optimalLineupData.totalSalary}`
};
