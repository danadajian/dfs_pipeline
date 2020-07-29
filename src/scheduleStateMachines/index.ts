import {getPipelineStartTimes} from './getPipelineStartTimes';
import {convertStartTimesToLocal} from './convertStartTimesToLocal';
import {staggerPipelineStartTimes} from './staggerPipelineStartTimes';
import {createCloudWatchEvent, uploadObjectToS3} from '../aws/aws';

export const scheduleStateMachinesHandler = async (event): Promise<string> => {
    const {sports} = event;
    return getPipelineStartTimes(sports)
        .then(async pipelineStartTimes => {
            for (const startTime of pipelineStartTimes) {
                const {sport, date} = startTime;
                await createCloudWatchEvent(sport, date)
            }
            return pipelineStartTimes
        })
        .then(pipelineStartTimes => {
            return staggerPipelineStartTimes(pipelineStartTimes)
        })
        .then(startTimes => {
            return convertStartTimesToLocal(startTimes)
        })
        .then(localStartTimes => {
            return uploadObjectToS3(localStartTimes, 'startTimes.json')
        })
        .then(() => {
            return 'Events created!'
        });
};
