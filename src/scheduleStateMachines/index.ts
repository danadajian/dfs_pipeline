import {getPipelineStartTimes} from './getPipelineStartTimes';
import {convertStartTimesToEST} from './convertStartTimesToEST';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';

export const scheduleStateMachinesHandler = async (): Promise<string> => {
    return getPipelineStartTimes()
        .then(async pipelineStartTimes => {
            for (const startTime of pipelineStartTimes) {
                const {sport, date} = startTime;
                await createCloudWatchEvent(sport, date)
            }
            return pipelineStartTimes
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
