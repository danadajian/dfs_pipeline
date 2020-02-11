const fs = require('fs');
const fanduelApiResponse = JSON.parse(fs.readFileSync('./testFanduelApiResponse.json'));

const callApi = async () => {
    return Promise.resolve(fanduelApiResponse)
};

exports.callApi = callApi;