export const generateMessage = (sport: string, optimalLineupData: any) => {
    return `Good evening. Here is the optimal ${sport.toUpperCase()} lineup for tonight:` +
        optimalLineupData.lineup.map(player =>
            `\n\n${player.name} ${player.team} ${player.position}`
            + `\nProjection: ${player.projection.toFixed(2)}`).join('')
        + `\n\nTotal projected points: ${optimalLineupData.totalProjection.toFixed(2)}`
        + `\nTotal salary: $${optimalLineupData.totalSalary}`
};
