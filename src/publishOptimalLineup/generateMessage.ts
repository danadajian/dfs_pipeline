export const generateMessage = (sport: string, optimalLineupData: any) => {
    return `Good evening. Here is the optimal ${sport.toUpperCase()} lineup for tonight:` +
        optimalLineupData.lineup.map(player => `\n${player.name} ${player.team} ${player.position}`).join('')
        + `\nTotal projected points: ${optimalLineupData.totalProjection.toFixed(2)}`
        + `\nTotal salary: $${optimalLineupData.totalSalary}`
};
