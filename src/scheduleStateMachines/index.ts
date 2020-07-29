import {getPipelineStartTimes} from './getPipelineStartTimes';
import {convertStartTimesToEST} from './convertStartTimesToEST';
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
        .then(startTimes => {
            return convertStartTimesToEST(startTimes)
        })
        .then(async pipelineStartTimes => {
            return uploadObjectToS3(pipelineStartTimes, 'startTimes.json')
        })
        .then(() => {
            return 'Events created!'
        });
};
