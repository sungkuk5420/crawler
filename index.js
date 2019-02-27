const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const xlsx = require('xlsx');

//parse csv file
// const csv = fs.readFileSync('csv/data.csv');
// const records = parse(csv.toString('utf-8'));
// records.forEach((r, i) => {
//     console.log(i, r);
// });

//parse csv file end point

//parse xlsx file
const workbook = xlsx.readFile('xlsx/data.xlsx');
console.log(Object.keys(workbook.Sheets)); // TODO: workbook.SheetNames
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws); // TODO: 강좌에서 header 옵션 보여주기
for (const [i, r] of records.entries()) {
    console.log(i, r);
}