import {convertStartTimesToEST} from './convertStartTimesToEST';
import {DFS_PIPELINE_BUCKET_NAME} from '@dadajian/shared-fantasy-constants';
import {getMainSlateStartTimes} from "./getMainSlateStartTimes";
import {getPipelineStartTime} from "./getPipelineStartTime";
import {getCloudWatchParams} from "./getCloudWatchParams";
import {createCloudWatchEvent, uploadObjectToS3} from "../aws/aws";

export const scheduleStateMachinesHandler = async (): Promise<string> => {
    return getMainSlateStartTimes()
        .then(async slateStartTimes => {
            for (const startTime of slateStartTimes) {
                const {sport, date} = startTime;
                const pipelineStartTime = getPipelineStartTime(date);
                const {putRuleParams, putTargetsParams} = getCloudWatchParams(sport, pipelineStartTime);
                await createCloudWatchEvent(putRuleParams, putTargetsParams)
            }
            return slateStartTimes
        })
        .then(startTimes => {
            return convertStartTimesToEST(startTimes)
        })
        .then(startTimes => {
            return uploadObjectToS3(startTimes, DFS_PIPELINE_BUCKET_NAME, 'startTimes.json')
        })
        .then(() => {
            return 'Events created!'
        });
};
