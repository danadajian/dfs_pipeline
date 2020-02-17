require('dotenv').config({path: __dirname + '/../../.env'});
const puppeteer = require('puppeteer');
const contestNames = require('../resources/contestNames');

handler(process.argv[2]).then(result => console.log(result));

async function handler(sport) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {width: 1366, height: 768},
        headless: true,
    });
    const page = await browser.newPage();

    let contestUrl = '';
    await page.goto(`${process.env.FANDUEL_URL}/contests`)
        .then(() => page.type("input[data-test-id='login.email']", process.env.FANDUEL_USERNAME))
        .then(() => page.type("input[data-test-id='login.password']", process.env.FANDUEL_PASSWORD))
        .then(() => page.click("button[data-test-id='login.submit']"))
        .catch(() => 'Failed to login.')
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
        .then(() => page.waitForSelector("input[data-test-id='ContestDetailsEnterNewLineup']", {timeout: 5000}))
        .then(() => page.click("input[data-test-id='ContestDetailsEnterNewLineup']"))
        .catch(() => 'You have not already entered another contest.')
        .then(() => page.waitForSelector("input[data-test-id='player_search:Input']"))
        .then(() => {
            return page.$x("//button[contains(., 'Reserve without lineup')]")
        })
        .then((button) => {
            if (button) {
                button[0].click();
            }
        })
        .then(() => page.waitForXPath(`//button[contains(., 'Reserve with ${contestNames[sport].cost} cash')]`))
        .then(() => {
            return page.$x(`//button[contains(., 'Reserve with ${contestNames[sport].cost} cash')]`)
        })
        .then((button) => {
            if (button) {
                button[0].click();
            }
        })
        .then(() => page.waitForSelector("header[class='modal-header']"))
        .then(() => page.goto(`${process.env.FANDUEL_URL}/upcoming`))
        .then(() => page.waitForSelector("a[class='button primary empty-lineup__cta']"))
        .then(() => {
            return page.evaluate('document.querySelector("a[class=\'button primary empty-lineup__cta\']").getAttribute("href")');
        })
        .then((hrefLink) => contestUrl = `${process.env.FANDUEL_URL}${hrefLink}`)
        .then(() => browser.close())
        .catch(() => 'A timeout likely occurred.');

    return contestUrl;
}
