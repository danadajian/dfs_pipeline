declare module 'axios' {
    export function get(url: string, options?: any);
}

export interface StartTime {
    sport: string,
    date: Date
}