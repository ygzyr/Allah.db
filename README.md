# ygzdb




```
const ygzdb = require("ygzdb")

ygzdb.yenidb("ygzdb")

const db = ygzdb.getir("ygzdb")

payload = {
    name: 'Yağız'
}

console.log(db.ekle(payload))

// [ { _id: [ '2637821589679' ], data: [ [Object] ] } ]

console.log(db.bul(2637821589679"))

db.sil("2637821589679")

```

