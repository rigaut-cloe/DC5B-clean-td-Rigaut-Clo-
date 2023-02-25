const csvParser = require('csv-parser')
const fs = require('fs')

// Sauvegarde l'index courant
let currentIndex = 0

fs.createReadStream('electronic-card-transactions-december-2022-csv-tables.csv')
  .pipe(csvParser())
  .on('data', (data) => {
    currentIndex++

    if (currentIndex < 21) {
      console.log(data)
    }
  })
  .on('end', () => {
    console.log('Ended reading electronic-card-transactions-december-2022-csv-tables.csv')
  })