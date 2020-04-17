export const generateTextMessageOutput = (sport, optimalLineupData) => {
    return `Good evening, Tony. Here is the optimal ${sport.toUpperCase()} lineup for tonight:` +
        optimalLineupData.lineup.map(player => `\n${player.name} ${player.team} ${player.position}`).join('')
        + `\nTotal projected points: ${optimalLineupData.totalProjection.toFixed(2)}`
        + `\nTotal salary: $${optimalLineupData.totalSalary}`
};
