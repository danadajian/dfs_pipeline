const fs = require('fs');
const fanduelData = JSON.parse(fs.readFileSync('./testFanduelData.json'));
const projectionsData = JSON.parse(fs.readFileSync('./testProjectionsData.json'));
const optimalLineupNames = JSON.parse(fs.readFileSync('./testOptimalLineup.json'));

const retrieveObjectFromS3 = async (fileName) => {
    return fileName === 'fanduelData.json' ? Promise.resolve(fanduelData) :
        fileName.endsWith('ProjectionsData.json') ? Promise.resolve(projectionsData) :
            Promise.resolve(optimalLineupNames);
};

const uploadObjectToS3 = async () => {
    return Promise.resolve('File uploaded successfully.')
};

exports.retrieveObjectFromS3 = retrieveObjectFromS3;
exports.uploadObjectToS3 = uploadObjectToS3;