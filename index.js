const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const xlsx = require('xlsx');
const axios = require('axios');
const cheerio = require('cheerio');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

// console.log(records);
//parse csv file
// const csv = fs.readFileSync('csv/data.csv');
// const records = parse(csv.toString('utf-8'));
// records.forEach((r, i) => {
//     console.log(i, r);
// });
//parse csv file end point

//parse xlsx file
// const workbook = xlsx.readFile('xlsx/data.xlsx');
// console.log(Object.keys(workbook.Sheets)); // TODO: workbook.SheetNames
// const ws = workbook.Sheets.영화목록;
// const records = xlsx.utils.sheet_to_json(ws); // TODO: 강좌에서 header 옵션 보여주기
// for (const [i, r] of records.entries()) {
//     console.log(i, r);
// }
//parse xlsx file end point

//axios crawler
const crawler = async () => {
    // add_to_sheet(ws, 'C1', 's', '평점');
    const response = await axios.get('https://www.amazon.co.jp/');
    // console.log(response);
    if (response.status === 200) {
        const html = response.data;
        // console.log(html);
        const $ = cheerio.load(html);
        const $categorys = $('.product-shoveler');
        for (var i = 0, len = $categorys.length; i < len; i++) {
            var $titleDOM = $categorys.eq(i).find('.as-title-block-left');
            var $sections = $titleDOM.closest('.card-lite');
            var $items = $titleDOM.closest('.card-lite').find('.feed-carousel-card');
            console.log($titleDOM.text());
            console.log($sections.length);
            for (var j = 0, jlen = $items.length; j < jlen; j++) {
                var src = $items.eq(j).find('img').attr('src');
                console.log(`${src}`);
            }
        }
    }
    // await Promise.all(records.map(async (r) => {

    // }));
    // xlsx.writeFile(workbook, 'xlsx/result.xlsx');
};
crawler();
//axios crawler end point