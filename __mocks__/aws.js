const fs = require('fs');
const fanduelData = JSON.parse(fs.readFileSync('./testFanduelData.json'));
const projectionsData = JSON.parse(fs.readFileSync('./testProjectionsData.json'));

const retrieveObjectFromS3 = async (fileName) => {
    return fileName === 'fanduelData.json' ? Promise.resolve(fanduelData) : Promise.resolve(projectionsData);
};

exports.retrieveObjectFromS3 = retrieveObjectFromS3;