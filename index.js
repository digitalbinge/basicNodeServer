const http = require('http');
const port = 3000;


let todo = [
	{ task: 'Go for a run', status: false },
	{ task: 'Drink water', status: true }
]

function handleMyRequest(request, response) {
	if (request.method === 'GET' && request.url === '/api/todo') {
		response.writeHead(200, {
			'Content-Type': 'application/json'
		})
		response.end(JSON.stringify(todo));
	} else if (request.url === '/api/teapot') {
		response.writeHead(418)
		response.end(`I'm a teapot`);
	} else if (request.method === 'POST' && request.url === '/api/todo') {

		let body = ''

		request.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
			body += chunk
		});

		request.on('end', () => {
			todo.push(JSON.parse(body));
		});

		response.end();
	} else {
		response.writeHead(404);
		response.end();
	}
}

const server = http.createServer(handleMyRequest)

console.log(`Server is running on ${port}!`);
server.listen(port);