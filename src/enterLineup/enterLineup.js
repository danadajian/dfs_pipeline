require('dotenv').config({path: __dirname + '/../../.env'});
const puppeteer = require('puppeteer');
const aws = require('../aws');
const contestNames = require('../resources/contestNames');

enterLineup(process.argv[2]).then(result => console.log(result));

async function enterLineup(sport) {
    const optimalPlayerData = await aws.retrieveObjectFromS3(sport + 'OptimalLineup.json');
    const optimalPlayerNames = optimalPlayerData.lineup.map(player => player.name);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {width: 1366, height: 768},
        headless: false,
    });
    const page = await browser.newPage();

    await page.goto(`${process.env.FANDUEL_URL}/contests`)
        .then(() => page.type("input[data-test-id='login.email']", process.env.FANDUEL_USERNAME))
        .then(() => page.type("input[data-test-id='login.password']", process.env.FANDUEL_PASSWORD))
        .then(() => page.click("button[data-test-id='login.submit']"))
        .catch(() => console.log('Failed to login.'))
        .then(() => page.waitForSelector("span[class='ab-close-button']", {timeout: 5000}))
        .catch(() => 'No window to close.')
        .then(() => page.click("span[class='ab-close-button']"))
        .catch(() => 'No close button necessary.')
        .then(() => page.waitForSelector("a[href='/contests/" + sport + "']"))
        .then(() => page.click("a[href='/contests/" + sport + "']"))
        .then(() => page.waitForSelector("input[data-test-id='contest_search:Input']"))
        .then(() => page.type("input[data-test-id='contest_search:Input']", contestNames[sport].name))
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
        .then(() => page.waitForSelector("div[class='modal-container']"))
        .then(() => browser.close())
        .catch(() => console.log('A timeout likely occurred.'));

    return 'Lineup entered!';
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, 1000*sec));
}
