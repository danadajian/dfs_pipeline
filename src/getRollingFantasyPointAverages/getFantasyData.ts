import {invokeLambdaFunction} from "../aws/aws";

export const getFantasyData = async (payload) => {
    return invokeLambdaFunction(process.env.GET_FANTASY_DATA_LAMBDA_NAME, payload);
};