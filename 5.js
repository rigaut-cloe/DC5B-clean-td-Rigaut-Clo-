const fs = require('fs')
const csvParser = require('csv-parser')

// Lecture du fichier
const readStream = fs.createReadStream('electronic-card-transactions-december-2022-csv-tables.csv')
// Ecriture dans le fichier
const writeStream = fs.createWriteStream('result.csv')

const cleanedData = []

let currentId = 1;

readStream.pipe(csvParser())
  .on('data', (data) => {
    let obj = null

    Object.keys(data).forEach((field) => {
      if (data[field] === '') {
        return
      }

      if (data['Series_title_2'].includes('Debit') || data['Series_title_2'].includes('Credit') || data['Series_title_2'].includes('Services')) {
        obj = {}
        obj['id'] = currentId
        obj['period'] = data['Period']
        obj['dataValue'] = data['Data_value']
        obj['seriesTitle2'] = data['Series_title_2']
      }
    })

    if (obj) {
      cleanedData.push(obj)

      currentId++
    }
  })
  .on('end', () => {
    writeStream.write('id;Period;Data_value;Series_title_2\n')

    cleanedData.forEach((data) => {
      writeStream.write(`${data.id};${data.period};${data.dataValue};${data.seriesTitle2}\n`)
    })

    writeStream.end()
  })