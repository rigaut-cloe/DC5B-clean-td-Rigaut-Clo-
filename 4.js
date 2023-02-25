const fs = require('fs')

const data = [
  { id: 1, nom: 'Tondeuse 1', puissance: '10kw', autonomie: '2h', energie: 'A' }
]

const writeStream = fs.createWriteStream('tondeuse.csv')

writeStream.write('Id;Nom de la tondeuse;Puissance;Autonomie;Energie\n')

data.forEach((d) => {
  writeStream.write(`${d.id};${d.nom};${d.puissance};${d.autonomie};${d.energie}\n`)
})

writeStream.end()