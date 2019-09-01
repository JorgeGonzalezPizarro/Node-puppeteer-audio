
const puppeteer = require('puppeteer');
const axios = require('axios');
const ChinesseCharacters = require('../../../domain/ChinesseCharacters');
const fs = require("fs")

const DIV_TABLE = ".table-responsive"
const TABLE = ".table.table-condensed.table-striped tbody tr"
const AUDIO_TD_CLASS = "py-font"


class AudioRepository {
    constructor() {
        this.puppeteer = puppeteer;
    }



    async getAudio() {

        const browser = await puppeteer.launch({headless: false,   devtools: true,
            });
        const page = await browser.newPage();

        await page.goto('https://www.archchinese.com/arch_chinese_radicals.html');

        // Type into search box.

        // Wait for suggest overlay to appear and click "show all results".

        // await page.waitForSelector(DIV_TABLE);
        // await page.waitForSelector(TABLE);
        // await page.waitForSelector(AUDIO_TD_CLASS);


            //     const data = await page.evaluate((table) => {
            //         const trs = Array.from(document.querySelectorAll(table))
            //         const td =  trs.slice(2,trs.length).map(td => {
            //
            //            return td.innerHtml
            //         })
            //         return td
            //     }, TABLE);
            //     console.log(data)
            // // await browser.close();
            // }
            // catch (e) {
            //     console.log(e)
            //
            // }

            await page.waitFor(1000);
            const teams = await page.evaluate(() => {


                const data = []

                const teamRows = Array.from(document.querySelectorAll(".table.table-condensed.table-striped tbody tr ")).slice(2)

                // looping over each team row
                for ( let [key, tr] of Object.entries(teamRows)) {
                    const tds = Array.from(tr.querySelectorAll('td'))

                    let name;
                    let name1;
                    let name2;
                    let name3;
                    let name4;
                    let name5;
                    for (let [key2, value] of Object.entries(tds)) {
                        switch (key2) {
                            case "0" : {
                                name = value.innerText;
                                break;
                            }
                            case "1" : {
                                name1 = value.innerText;
                                break;
                            }
                            case "2" : {
                                name2 = value.innerText;
                                break;
                            }
                            case "3" : {
                                let attr = value.firstChild.getAttribute("onclick");
                                let lenght = "fn_playSinglePinyin(\\".length
                                let t = attr.substr(lenght).replace("/\\/g","").replace("'","").replace(")","").replace(";","");
                                name3 = t
                                break;
                            }
                            case "4" : {
                                name4 = value.innerText;
                                break;
                            }
                            case "5" : {
                                name5 = value.innerText;
                                break;
                            }

                        }
                    }

                    data.push(
                        {
                            "Radical No.	": name,
                            "Radical": name1,
                            "English":name2,
                            "pinyin": name3,
                            "Stroke Count	": name4,
                            "Variant":  name5
                        }
                    )
                }
                return data

            });
            const array = Array.from(teams)
         async function a() {
               return array.map( chinesseCharacters => {
                 return  axios.request({
                     responseType: 'arraybuffer',
                     url: `https://www.archchinese.com/audio/${chinesseCharacters.pinyin}.mp3`,
                     method: 'get',
                     headers: {
                         'Content-Type': 'audio/mpeg',
                     },
                 }).then((result) => {
                     return Object.assign({},{...chinesseCharacters,audio : result.data})
                 }).catch(e => {
                     return axios.request({
                         responseType: 'arraybuffer',
                         url: `https://www.archchinese.com/swf/${chinesseCharacters.pinyin}.mp3`,
                         method: 'get',
                         headers: {
                             'Content-Type': 'audio/mpeg',
                         },
                     }).then((result) => {
                         return  Object.assign({},{...chinesseCharacters,audio : result.data})
                     }).catch(e => console.log(e))
                 })
             }).map(it => it)
         }

        // await browser.close()

    }}





module.exports = AudioRepository