import {invokeLambdaFunction} from "../aws/aws";

export const getCurrentData = async (sport: string) => {
    return invokeLambdaFunction(process.env.GET_CURRENT_DATA_LAMBDA_NAME, {sport});
};