const express = require('express')
const app = express()
let bodyParser = require('body-parser')
let cors = require('cors')

var User = require('./user')
var Task = require('./task')

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

app.get('/users', (req, res) => {
	User.all()
		.then(function (users) {
		  res.status(200)
			.json(users)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})

app.get('/userByName', (req, res) => {
  //console.log(req.query.name)
  User.byName(req.query.name)
		.then(function (users) {
		  res.status(200)
			.json(users)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
app.get('/userById', (req, res) => {
	console.log(req.query.id);
  let userId = req.query.id
  User.forge({id: userId}).fetch().then(function (users) {
    if (!users) {
      return res.status(404).json({ error: true, message: 'user not found' })
    } else {
      res.status(200).json(users)
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})
app.post('/user/create', (req, res) => {
	console.log(req.body);
  let user = {
  'name': req.body.user.name,
  'email': req.body.user.email
  }
User.forge(user)
        .save()
        .then((user) => {
          console.log(user)
          res.status(200)
            .json(user)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({error: true, data: {error: err, message: err.message}})
        })
})
app.post('/user/update', (req, res) => {
	console.log(req.body);
  let user = {
  'id': req.body.user.id,
  'name': req.body.user.name,
  'email': req.body.user.email
  }
User.forge(user)
        .save()
        .then((user) => {
          console.log(user)
          res.status(200)
            .json(user)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({error: true, data: {error: err, message: err.message}})
        })
})
app.get('/user/delete', (req, res) => {
	console.log(req.query.id);
  let userId = req.query.id
  User.forge({id: userId}).fetch().then(function (users) {
    if (!users) {
      return res.status(404).json({ error: true, message: 'user not found' })
    } else {
      users.destroy()
      res.status(200).json({ error: false, data: { message: 'user removed' } })
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})

// tasks routes
// http://localhost:3000/tasks
app.get('/tasks', (req, res) => {
	Task.all()
		.then(function (tasks) {
		  res.status(200)
			.json(tasks)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
// http://localhost:3000/task/name
app.get('/task/name', (req, res) => {
  //console.log(req.query.name)
  Task.byName(req.query.name)
		.then(function (tasks) {
		  res.status(200)
			.json(tasks)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
// http://localhost:3000/task/id
app.get('/task/id', (req, res) => {
	// console.log(req.query.id);
  let taskId = req.query.id
  Task.forge({id: taskId}).fetch().then(function (tasks) {
    if (!tasks) {
      return res.status(404).json({ error: true, message: 'task not found' })
    } else {
      res.status(200).json(tasks)
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})

// http://localhost:3000/task/status
app.get('/task/status', (req, res) => {
	// console.log(req.query.id);
  let taskStatus = req.query.status
  Task.byStatus(taskStatus)
		.then(function (tasks) {
		  res.status(200)
			.json(tasks)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
app.post('/task/update', (req, res) => {
	console.log(req.body);
  let task = {
  'id': req.body.task.id,
  'name': req.body.task.name,
  'description': req.body.task.description,
  'status': req.body.task.status
  }
Task.forge(task)
        .save()
        .then((task) => {
          console.log(task)
          res.status(200)
            .json(task)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({error: true, data: {error: err, message: err.message}})
        })
})
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
