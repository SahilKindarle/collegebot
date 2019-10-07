
// const express = require("express")
const csv = require('csv-parser')

const fs = require('fs')
const path = require('path')

let router = require('express').Router()


router.get('/', (req, res) => {
	res.render('index')
})

router.get("/search/:name", (req, res) => {
	let found = false;
	let results = [];
	
    fs.createReadStream(path.join(__dirname + '/data/test.csv'))
        .pipe(csv())
        .on('data', data => {
            if (data.NAME.toLowerCase().indexOf(req.params.name.toLowerCase()) != -1) {
				results.push(data)
				found = true;
            }
        })
        .on('end', () => {
            res.send({results: results})
            if (!found) console.log(' not found')
        })

})

module.exports = router
