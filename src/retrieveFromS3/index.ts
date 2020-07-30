import {retrieveObjectFromS3} from "../aws/aws";

export const retrieveFromS3Handler = async (event): Promise<any> => {
    const {fileName} = event;
    return retrieveObjectFromS3(fileName)
}