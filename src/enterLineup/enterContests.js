require('dotenv').config({path: __dirname + '/../../.env'});
const puppeteer = require('puppeteer');
const contestNames = require('../resources/contestNames');

handler(process.argv[2]).then(result => console.log(result));

async function handler(sport) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {width: 1366, height: 768},
        headless: false,
    });
    const page = await browser.newPage();

    let contestUrl = '';
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
        .then(() => page.type("input[data-test-id='contest_search:Input']", contestNames[sport]))
        .then(() => page.waitForSelector("a[data-test-id='ContestCardEnterLink']"))
        .then(() => page.click("a[data-test-id='ContestCardEnterLink']"))
        .then(() => page.waitForSelector("button[class='draft__reserve-button button tertiary']"))
        .then(() => contestUrl = page.url())
        .then(() => page.click("button[class='draft__reserve-button button tertiary']"))
        .then(() => page.waitForSelector("button[class='drafting-reserve-modal__ah drafting-reserve-modal__bv drafting-reserve-modal__bk drafting-reserve-modal__ax drafting-reserve-modal__bl drafting-reserve-modal__bm drafting-reserve-modal__j drafting-reserve-modal__bw drafting-reserve-modal__bx drafting-reserve-modal__by drafting-reserve-modal__bz drafting-reserve-modal__ca drafting-reserve-modal__cb drafting-reserve-modal__cc drafting-reserve-modal__cd drafting-reserve-modal__ce drafting-reserve-modal__cf drafting-reserve-modal__cg drafting-reserve-modal__ch drafting-reserve-modal__t drafting-reserve-modal__u drafting-reserve-modal__v drafting-reserve-modal__w']"))
        .then(() => page.click("button[class='drafting-reserve-modal__ah drafting-reserve-modal__bv drafting-reserve-modal__bk drafting-reserve-modal__ax drafting-reserve-modal__bl drafting-reserve-modal__bm drafting-reserve-modal__j drafting-reserve-modal__bw drafting-reserve-modal__bx drafting-reserve-modal__by drafting-reserve-modal__bz drafting-reserve-modal__ca drafting-reserve-modal__cb drafting-reserve-modal__cc drafting-reserve-modal__cd drafting-reserve-modal__ce drafting-reserve-modal__cf drafting-reserve-modal__cg drafting-reserve-modal__ch drafting-reserve-modal__t drafting-reserve-modal__u drafting-reserve-modal__v drafting-reserve-modal__w']"))
        //.then(() => page.waitForSelector("INSERT CONTEST CONFIRMATION SELECTOR HERE"))
        .then(() => sleep(5))
        .then(() => browser.close())
        .catch(() => console.log('A timeout likely occurred.'))
        .finally(() => 'Contest entered!');

    return contestUrl;
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, 1000*sec));
}
