import {SIXTY_SECONDS_IN_MILLISECONDS, SLATE_OFFSET_MINUTES} from "../constants";

export const getPipelineStartTime = (slateStart: Date): Date => {
    return new Date(slateStart.getTime() - SLATE_OFFSET_MINUTES * SIXTY_SECONDS_IN_MILLISECONDS);
};