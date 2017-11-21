const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

let students = ['Derf', 'Lil Nelly', 'Lip Dog'];

app.use(bodyParser.json())

app.get('/students', (req, res) => {
	console.log('GET Students');
	res.send(students);
})

app.post('/students', (req, res) => {
	console.log("Here's what the user posted");
	students.push(req.body.name);
	res.send(students);
})


app.listen(port);