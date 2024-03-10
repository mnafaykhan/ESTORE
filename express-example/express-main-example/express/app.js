const express = require('express');
const bodyParser = require('body-parser');

const routes = {
	users: require('./routes/users'),
	instruments: require('./routes/instruments'),
	orchestras: require('./routes/orchestras'),
	// Add more routes here...
	// items: require('./routes/items'),
};

const app = express();

// Body Parsing Middleware: The body-parser middleware is used to parse JSON and URL-encoded request bodies, making it easy to access request data in your route handlers.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We create a wrapper to workaround async errors not being transmitted correctly.
// server code DRY (Don't Repeat Yourself) and easy to maintain.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// We provide a root route just as an example
app.get('/', (req, res) => {
	res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {

	if (routeController.signup) {
		app.post(
		  `/api/${routeName}/signup`,
		  makeHandlerAwareOfAsyncErrors(routeController.signup)
		);
	  }
	  if (routeController.login) {
		app.post(
		  `/api/${routeName}/login`,
		  makeHandlerAwareOfAsyncErrors(routeController.login)
		);
	  }	
	  	
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}	
// PUT is restricted to create or update operations, 
// while a POST operation may perform any type of processing. Unlike a POST, PUT
//  operations may only operate on the resource identified by the URL provided. 	

	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
//  update only updates the fields that you specify. It does not save any other changes that have been made on this instance since it was retrieved, or last saved:
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}

	
}

module.exports = app;
