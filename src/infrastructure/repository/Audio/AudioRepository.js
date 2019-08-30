
const puppeteer = require('puppeteer');
const ChinesseCharacters = require('../../../domain/ChinesseCharacters');


const DIV_TABLE = ".table-responsive"
const TABLE = ".table.table-condensed.table-striped tbody tr "
const AUDIO_TD_CLASS = "py-font"


class AudioRepository {
    constructor() {
        this.puppeteer = puppeteer;
    }



    async getAudio() {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.archchinese.com/arch_chinese_radicals.html');

        // Type into search box.

        // Wait for suggest overlay to appear and click "show all results".

        // await page.waitForSelector(DIV_TABLE);
        // await page.waitForSelector(TABLE);
        // await page.waitForSelector(AUDIO_TD_CLASS);

        try {

            const data = await page.evaluate((table) => {
                const trs = Array.from(document.querySelectorAll(table))
                const td =  trs.slice(2,trs.length).map(td => {

                   return td.innerHtml
                })
                return td
            }, TABLE);
            console.log(data)
        await browser.close();
        }
        catch (e) {
            console.log(e)

        }
    };
    }





module.exports = AudioRepository