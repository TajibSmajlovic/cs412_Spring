const express = require('express')
const app = express()
let bodyParser = require('body-parser')
let cors = require('cors')

var User = require('./user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))
app.use(cors())

// in NodeJS/Express (server)
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Access-Control-Allow-Headers')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
  next()
})

app.get('/rows', (req, res) => {
	User.all()
		.then(function (rows) {
		  res.status(200)
			.json(rows)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})

app.get('/rowbyDepartment', (req, res) => {
  User.byDepartment(req.query.department)
		.then(function (row) {
		  res.status(200)
			.json(row)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})

app.get('/rowbyId', (req, res) => {
  User.byId(req.query.id)
		.then(function (rows) {
		  res.status(200)
			.json(rows)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})

app.get('/', (req, res) => res.send('CS412_Project_1 - Tajib Smajlović_140302097!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
