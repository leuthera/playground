require('puppeteer').launch({
    headless: false,
    slowMo: 80,
    args: [ '--window-size=640x480' ]
}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('file:///' + process.argv[2]);
    await page.click('input[name=name]');
    await page.type('input[name=name]', 'TestName');
    await page.click('input[name=age]');
    await page.type('input[name=age]', 'TestAge');
    await page.click('button');
    const result = await page.$eval('#msg', el => el.textContent);
    await browser.close();

    console.log( result === 'TestNameTestAge');
});
