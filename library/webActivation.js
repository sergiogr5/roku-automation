const config = require('../env.config');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://disneynow.com/activate`);

        console.log(config.WEB_USER);
        console.log(config.WEB_PASS);

        await (await $('input[name="code_0"]')).setValue(process.env.CODE.split('')[0]);
        await (await $('input[name="code_1"]')).setValue(process.env.CODE.split('')[1]);
        await (await $('input[name="code_2"]')).setValue(process.env.CODE.split('')[2]);
        await (await $('input[name="code_3"]')).setValue(process.env.CODE.split('')[3]);
        await (await $('input[name="code_4"]')).setValue(process.env.CODE.split('')[4]);
        await (await $('input[name="code_5"]')).setValue(process.env.CODE.split('')[5]);
        await (await $('input[name="code_6"]')).setValue(process.env.CODE.split('')[6]);
        await (await $('button=CONTINUE')).click();
        await (await $('div[title="DIRECTV"')).click();
        await (await $('#usernameInputId')).setValue(config.WEB_USER);
        await (await $('input[name ="password"]')).setValue(config.WEB_PASS);
        await (await $('#loginSubmitId')).click();
        await browser.pause(5000)
    });
});