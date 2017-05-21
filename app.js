"use strict"
const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)
const ctaNode = require('cta-api')
const parseXML = require('xml2js').parseString

app.use(express.static(__dirname))
server.listen(3000)

const key = "tZWNpjTrjnM5rMh8xLpeM8X95"
const type = "getvehicles"
let interval

io.on('connection', function(socket) {
	socket.on("start", function() {
		interval = setInterval(function() {
		http.get(`http://www.ctabustracker.com/bustime/api/v2/${type}?key=${key}&rt=80`, function(res) {
			// console.log(`http://www.ctabustracker.com/bustime/api/v2/${type}?key=${key}`)
			// console.log('STATUS: ' + res.statusCode)
			// console.log('HEADERS: ' + JSON.stringify(res.headers))

			// Buffer the body entirely for processing as a whole.
			let bodyChunks = []
			res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk)
			}).on('end', function() {
			let body = String(Buffer.concat(bodyChunks))
			parseXML(body, function(err, result) {
				for (let vehicle of result['bustime-response']['vehicle']) {
					for (let key in vehicle) {
						if (key === 'lat' || key === 'lon') {
							socket.emit(key, vehicle[key])
							// console.log(key, vehicle[key])
						}
					}
				}
			})

			})
		})	 	
	 }, 1000
	)
	
	})

	 
    socket.on("disconnect", function () {
        clearInterval(interval)
    })


})
 
