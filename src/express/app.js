const express = require('express');
const bodyParser = require('body-parser');

const routes = {
	users: require('./routes/users'),
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
	
}

module.exports = app;
