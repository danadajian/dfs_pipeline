require('dotenv').config();
const puppeteer = require('puppeteer');
const aws = require('../aws');

handler(process.argv[2]).then(r => console.log(r));

async function handler(sport) {
    const optimalPlayerNames = await aws.retrieveObjectFromS3(sport + 'OptimalLineup.json');

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {width: 1366, height: 768},
        headless: true,
    });
    const page = await browser.newPage();

    await page.goto(process.env.FANDUEL_HOME_URL);

    if (await page.$("span[class='ab-close-button']"))
        await page.click("span[class='ab-close-button']");

    await page.type("input[data-test-id='login.email']", process.env.USERNAME);
    await page.type("input[data-test-id='login.password']", process.env.PASSWORD);
    await page.click("button[data-test-id='login.submit']");

    await sleep(5);

    // await page.click("a[href='/contests/" + sport + "']");
    //
    // await sleep(5000);
    //
    // await page.type("input[data-test-id='contest_search:Input']", contestName);
    // await sleep(2000);
    // await page.click("a[data-test-id='ContestCardEnterLink']");

    await page.goto(process.env.CONTEST_URL);

    await sleep(5);

    for (let i = 0; i < optimalPlayerNames.length; i++) {
        await page.type("input[data-test-id='player_search:Input']", optimalPlayerNames[i]);
        await sleep(1);
        await page.click("button[data-test-id='player-action-add']");
        await sleep(1);
    }

    // await page.click("button[data-test-id='enter-button']");

    await sleep(5);

    await browser.close();

    return 'Lineup entered!'
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, 1000*sec));
}
