export const getTodayDateString = (): string => {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

export const getCronExpressionFromDate = (date: Date): string => {
    return `cron(${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} ${(date.getUTCMonth() + 1)} ? ${date.getUTCFullYear()})`
};