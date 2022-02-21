const { test, expect, chromium } = require('@playwright/test');
const fs = require("fs");
let browser = "";
var goToLink = "";

class testLinks{
    constructor(){
        var beforeExecution = fs.readFileSync("beforeExecution.json", "utf-8");
        var links = fs.readFileSync("./data/links.json", "utf-8");
        const afterParseBE = JSON.parse(beforeExecution);
        const afterParseLink = JSON.parse(links);
    
        if(JSON.stringify(afterParseBE["link"]).match("Google")){
            console.log("Link is : " + JSON.stringify(afterParseLink["Google"]));
            goToLink = afterParseLink["Google"];
            
        }
        else if(JSON.stringify(afterParseBE["link"]).match("Youtube")){
            goToLink = goToLink = afterParseLink["Youtube"];
            console.log("Link is : " + JSON.stringify(afterParseLink["Youtube"]));
            
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
    browser.close();
});

test('basic test', async ({ page }) => {
    t = new testLinks();
    console.log("Before Opening Page : " + goToLink);
    await page.goto(goToLink);
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
});
