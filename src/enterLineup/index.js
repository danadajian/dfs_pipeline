require('dotenv').config({path: __dirname + '/../../.env'});
const puppeteer = require('puppeteer');
const aws = require('../aws');

handler(process.argv[2]).then(result => console.log(result));

async function handler(sport) {
    const optimalPlayerNames = await aws.retrieveObjectFromS3(sport + 'OptimalLineup.json');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {width: 1366, height: 768},
        headless: true,
    });
    const page = await browser.newPage();

    await page.goto(process.env.FANDUEL_HOME_URL)
        .then(() => page.type("input[data-test-id='login.email']", process.env.USERNAME))
        .then(() => page.type("input[data-test-id='login.password']", process.env.PASSWORD))
        .then(() => page.click("button[data-test-id='login.submit']"))
        .catch(() => console.log('Failed to login.'))
        .then(() => page.waitForSelector("span[class='ab-close-button']", {timeout: 3000}))
        .catch(() => console.log('No window to close.'))
        .then(() => page.click("span[class='ab-close-button']"))
        .catch(() => console.log('No close button necessary.'))
        .then(() => page.waitForSelector("a[href='/contests/" + sport + "']"))
        .then(() => page.click("a[href='/contests/" + sport + "']"))
        .then(() => page.waitForSelector("input[data-test-id='contest_search:Input']"))
        .then(() => page.type("input[data-test-id='contest_search:Input']", 'dribbler'))
        .then(() => page.waitForSelector("a[data-test-id='ContestCardEnterLink']"))
        .then(() => page.click("a[data-test-id='ContestCardEnterLink']"))
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
        .then(() => page.click("button[data-test-id='enter-button']"))
        //.then(() => page.waitForSelector("INSERT LINEUP CONFIRMATION SELECTOR HERE"))
        .then(() => sleep(5))
        .then(() => browser.close())
        .catch(() => console.log('A timeout likely occurred.'))
        .finally(() => 'Lineup entered!');
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, 1000*sec));
}
