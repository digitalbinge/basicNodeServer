const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

let todo = [
	{ id: 0, task: "Go for a run", status: false },
	{ id: 1, task: "Do groceries", status: true }
];

let currentId = 1

app.use(bodyParser.json());

app.get('/api/todo', (req, res) => res.send(todo));
app.get('/api/todo/:id', (req, res) => {
	console.log(`Finding a task with an ID of ${parseInt(req.params.id)}`)
	res.send(todo.filter((task) => {
		return task.id === parseInt(req.params.id)
		})
	)
});

app.post('/api/todo', (req, res) => {
	console.log(`Recieved POST request: ${req.body.task} | Status: ${req.body.status}`);
	let newTask = {};
	newTask = req.body;
	newTask.id = ++currentId;
	console.log(newTask);
	todo.push(newTask);
	res.send(todo);
});

app.put('/api/todo/:id', (req, res) => {
	console.log(`Updating a task with an ID of ${parseInt(req.params.id)}`);
	let todoIndex = todo.findIndex(task => task.id === parseInt(req.params.id));
	todo[todoIndex].task = req.body.task;
	todo[todoIndex].status = req.body.status;
	res.send(todo);
})

app.delete('/api/todo/:id', (req, res) => {
	console.log(`Deleting a task with an ID of ${parseInt(req.params.id)}`);
	todo = todo.filter((task) => {
		return task.id !== parseInt(req.params.id);
		})
	res.send(todo);
});



// handle incorrect urls
app.use(function (req, res, next) {
	res.status(404).send("Sorry can't find that!");
})

app.listen(port);

