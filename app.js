const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')

const PORT = process.env.PORT || 3000

let app = express()

app.use(logger('dev'))
app.use(cors())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())

app.use(express.static('public'))
app.use(express.static('build'))

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/', require('./routes'))

app.listen(PORT, err => {
    if (err) {
        throw err
    }
    console.info('Listening on port ' + PORT + '...')
})
// -----
