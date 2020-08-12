import {convertStartTimesToEasternTime} from './convertStartTimesToEasternTime';
import {DFS_PIPELINE_BUCKET_NAME} from '@dadajian/shared-fantasy-constants';
import {getMainSlateFanduelStartTimes} from "./getMainSlateFanduelStartTimes";
import {getPipelineCronExpression} from "./getPipelineCronExpression";
import {getCloudWatchParams} from "./getCloudWatchParams";
import {createCloudWatchEvent, uploadObjectToS3} from "../aws/aws";
import {StartTime} from "../index";
import * as Bluebird from "bluebird";

export const scheduleStateMachinesHandler = async (): Promise<string> => {
    return getMainSlateFanduelStartTimes()
        .then((fanduelStartTimes: StartTime[]) => {
            return Promise.all([
                Bluebird.map(fanduelStartTimes, (startTime: StartTime) => {
                    const {sport, date} = startTime;
                    const cronExpression = getPipelineCronExpression(date);
                    const {putRuleParams, putTargetsParams} = getCloudWatchParams(sport, cronExpression);
                    return createCloudWatchEvent(putRuleParams, putTargetsParams)
                }, {concurrency: 1}),
                fanduelStartTimes
            ]);
        })
        .then(([_, fanduelStartTimes]) => {
            return convertStartTimesToEasternTime(fanduelStartTimes)
        })
        .then(startTimes => {
            return uploadObjectToS3(startTimes, DFS_PIPELINE_BUCKET_NAME, 'startTimes.json')
        })
        .then(() => {
            return 'Events created!'
        });
};
