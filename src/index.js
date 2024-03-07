// app: This imports the Express application from the ./express/app module, where you've presumably set up your middleware, routes, and other Express-related configur/* ations.
// sequelize: This imports the configured Sequelize instance from the ./sequelize module. This instance is set up with your database connection and model definitions. */

const app = require('./express/app');
const sequelize = require('./sequelize');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
// a safety mechanism to prevent the application from starting if it cannot connect to the database.		
		process.exit(1);
	}
}

async function init() {
	// It first ensures that the database connection is okay by calling assertDatabaseConnectionOk(). 
	// If the database connection is successful, it proceeds to start the Express server.	
	await assertDatabaseConnectionOk();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);
// starts the server and makes it listen for incoming requests on the specified port. 
// Upon successfully starting, it logs a message indicating the server is running and suggests trying out a route.

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});
}

init();