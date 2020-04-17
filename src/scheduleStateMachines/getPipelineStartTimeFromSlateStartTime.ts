import {SIXTY_SECONDS_IN_MILLISECONDS, SLATE_OFFSET_MINUTES} from "../constants";

export const getPipelineStartTimeFromSlateStartTime = (startTime: string): Date => {
    const startDate = new Date(startTime + ' PST');
    return new Date(startDate.getTime() - SLATE_OFFSET_MINUTES * SIXTY_SECONDS_IN_MILLISECONDS);
};