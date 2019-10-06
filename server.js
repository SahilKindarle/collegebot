const express = require("express")
const csv = require('csv-parser')

const fs = require('fs')
const path = require('path')


let found = false

app = express();
app.use(require('morgan')('dev'))
app.use(express.static("public"))

app.get("/test" ,(req,res) => {
    res.sendFile("test.html")
})


app.get("/search/:name", (req, res) => {

    let results = [];
    fs.createReadStream(path.join(__dirname + '/data/test.csv'))
        .pipe(csv())
        .on('data', data => {
            if (data.NAME.toLowerCase().indexOf(req.params.name.toLowerCase()) != -1) {
                results.push(data)
            }
        })
        .on('end', () => {
            res.send({results: results})
            if (!found) console.log(' not found')
        })

})



app.listen(3000)