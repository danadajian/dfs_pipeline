import {convertStartTimesToEST} from './convertStartTimesToEST';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';
import {getMainSlateStartTimes} from "./getMainSlateStartTimes";
import {getPipelineStartTime} from "./getPipelineStartTime";

export const scheduleStateMachinesHandler = async (): Promise<string> => {
    return getMainSlateStartTimes()
        .then(async slateStartTimes => {
            for (const startTime of slateStartTimes) {
                const {sport, date} = startTime;
                const pipelineStartTime = getPipelineStartTime(date);
                await createCloudWatchEvent(sport, pipelineStartTime)
            }
            return slateStartTimes
        })
        .then(startTimes => {
            return convertStartTimesToEST(startTimes)
        })
        .then(startTimes => {
            return uploadObjectToS3(startTimes, 'startTimes.json')
        })
        .then(() => {
            return 'Events created!'
        });
};
