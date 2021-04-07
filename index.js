const fs = require('fs');
const ygzdb = {}

ygzdb.yenidb = (payload) => {
    fs.writeFile(payload + ".json", '[]', function (err, data) {
        if (err) throw err;
    })
}


ygzdb.getir = (payload) => {
    try {
        const data = fs.readFileSync(payload + '.json', 'utf8')
        return {
            veri: JSON.parse(data),
            ekle: function (payload2) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    let databro = [{ _id: [], data: [] }]
                    databro[0].data.push(payload2)
                    databro[0]._id.push(JSON.stringify(Date.now()))
                    oldData.push(databro)
                    fs.writeFile(payload + '.json', JSON.stringify(oldData), function (err, data) {
                        if (err) console.error(err)
                        return 'mission completed'
                    })
                    return databro
                } catch (err) {
                    console.error(err)
                }
            },
            sil: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params)
                    oldData.splice(index, 1)
                    if (index < 0) {
                        return 'bu nedir loo yeniliyor mu ?'
                    }
                    fs.writeFile(payload + '.json', JSON.stringify(oldData), function (err, data) {
                        if (err) console.error(err)
                    })
                    return 'mission completed , tüm kanıtlar silindi';
                } catch (err) {
                    console.error(err)
                }
            },
            bul: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params)

                    return {
                        veri: oldData[index][0],
                        degistir: function (param) {
                            try {
                                const array = []
                                array.push(param)
                                oldData[index][0].data = array
                                fs.writeFile(payload + '.json', JSON.stringify(oldData), function (err, data) {
                                    if (err) console.error(err)
                                })
                                return oldData[index][0]
                            } catch (err) { }
                        },
                        ekle: function(param) {
                            oldData[index][0].data.push(param)
                            fs.writeFile(payload + '.json', JSON.stringify(oldData), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index][0]
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
            },
        }
    } catch (err) {
        console.error(err)
    }
}



module.exports = ygzdb;