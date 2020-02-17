require('dotenv').config({path: __dirname + '/../../.env'});
const puppeteer = require('puppeteer');
const aws = require('../aws');

handler(process.argv[2], process.argv[3]).then(result => console.log(result));

async function handler(sport, contestUrl) {
    const optimalPlayerNames = await aws.retrieveObjectFromS3(sport + 'OptimalLineup.json');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {width: 1366, height: 768},
        headless: true,
    });
    const page = await browser.newPage();

    await page.goto(`${process.env.FANDUEL_URL}/contests`)
        .then(() => page.type("input[data-test-id='login.email']", process.env.FANDUEL_USERNAME))
        .then(() => page.type("input[data-test-id='login.password']", process.env.FANDUEL_PASSWORD))
        .then(() => page.click("button[data-test-id='login.submit']"))
        .catch(() => console.log('Failed to login.'))
        .then(() => page.waitForSelector("span[class='ab-close-button']", {timeout: 3000}))
        .catch(() => console.log('No window to close.'))
        .then(() => page.goto(contestUrl))
        .then(() => page.waitForSelector("input[data-test-id='player_search:Input']"))
        .then(async () => {
            for (const playerName of optimalPlayerNames) {
                await page.type("input[data-test-id='player_search:Input']", playerName)
                    .then(() => sleep(1))
                    .then(() => page.waitForSelector("button[data-test-id='player-action-add']"))
                    .then(() => page.click("button[data-test-id='player-action-add']"))
                    .then(() => sleep(1))
            }
        })
        .then(() => page.click("button[class='button jumbo primary roster-edit__submit-button']"))
        .then(() => page.waitForSelector("div[class='upcoming']"))
        .then(() => browser.close())
        .catch(() => console.log('A timeout likely occurred.'));

    return 'Lineup entered!';
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, 1000*sec));
}
