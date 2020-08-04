export const getTimeOfDay = (): string => {
    const currentHour = new Date().getUTCHours();
    return currentHour > 17 ? 'afternoon' : currentHour > 5 ? 'morning' : 'evening'
}