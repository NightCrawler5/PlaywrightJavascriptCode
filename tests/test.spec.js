const { test, expect, chromium } = require('@playwright/test');
const fs = require("fs");
const { default: TestBase } = require('../startup/testBase');
let browser = "";
var goToLink = "";

class testLinks{
    constructor(){
        if(TestBase.App_Env == 'TEST'){
            console.log(process.env.TEST_LINK);
            goToLink = process.env.TEST_LINK;
        }else if(TestBase.App_Env == 'STAGE'){
            console.log(process.env.STAGE_LINK);
            goToLink = process.env.STAGE_LINK;
        }
    }
}

test.beforeAll(async () => {
    browser = await chromium.launch({
        args: ["--start-maximized"],
      headless: false,
    });

    const page = await browser.newPage();
});

test.afterAll(async () => {
    await browser.close();
});

test('basic test', async ({ page }) => {
    t = new testLinks();
    console.log("Before Opening Page : " + goToLink);
    await page.goto(goToLink);
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
});
