const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const xlsx = require('xlsx');
const axios = require('axios');
const cheerio = require('cheerio');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

console.log(records);
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
    add_to_sheet(ws, 'C1', 's', '평점');
    for (const [i, r] of records.entries()) {
        const response = await axios.get(r.링크);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const text = $('.score.score_left .star_score').text();
            console.log(r.제목, '평점', text.trim());
            const newCell = 'C' + (i + 2);
            add_to_sheet(ws, newCell, 'n', text.trim());
        }
    }
    // await Promise.all(records.map(async (r) => {

    // }));
    xlsx.writeFile(workbook, 'xlsx/result.xlsx');
};
crawler();
//axios crawler end point