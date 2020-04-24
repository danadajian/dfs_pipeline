import {invokeLambdaFunction} from "../aws/aws";

export const getCurrentData = async () => {
    return invokeLambdaFunction(process.env.GET_CURRENT_DATA_LAMBDA_NAME);
};