// app: This imports the Express application from the ./express/app module, where you've presumably set up your middleware, routes, and other Express-related configur/* ations.
// sequelize: This imports the configured Sequelize instance from the ./sequelize module. This instance is set up with your database connection and model definitions. */

const app = require('./express/app');
const sequelize = require('./sequelize');
const Joi = require('joi');

require('dotenv').config(); // Load environment variables from .env file

// const PORT = 8080;

const PORT = process.env.PORT || 8080; // Use port from .env or default to 5000

// Now you can access your environment variables using process.env
// console.log('Database Password:', process.env.DB_PASSWORD);
// console.log('API Key:', process.env.API_KEY);


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


const apiKeyMiddleware = (req, res, next) => {
	const apiKey = req.get('X-API-KEY');
	console.log(`API Key Received: ${apiKey}`); // Log the received API Key

	if (!apiKey || apiKey !== process.env.API_KEY) {
		return res.status(403).json({ error: 'Unauthorized' });
	}
	next();
};


async function init() {
	// It first ensures that the database connection is okay by calling assertDatabaseConnectionOk(). 
	// If the database connection is successful, it proceeds to start the Express server.	
	await assertDatabaseConnectionOk();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);
	// starts the server and makes it listen for incoming requests on the specified port. 
	// Upon successfully starting, it logs a message indicating the server is running and suggests trying out a route.

	// Middleware to check API key
	// curl -H "X-API-KEY: 12345" http://localhost:8080

	// app.use((req, res, next) => {
	// 	const apiKey = req.get('X-API-KEY');
	// 	console.log(`API Key Received: ${apiKey}`); // Log the received API Key
	// 	if (apiKey && apiKey === process.env.API_KEY) {
	// 		next();
	// 	} else {
	// 		res.status(403).send('Unauthorized');
	// 	}
	// });

	app.use(apiKeyMiddleware);

	// app.get('/users', apiKeyMiddleware, usersHandler) => {
	// 	res.send('Hello, users API OK!');

	// };

	app.get('/users', apiKeyMiddleware, (req, res) => {
		res.send('Hello, users API OK!');
	});


	const userSchema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		dob: Joi.date().iso(),
		// Add more validations as needed
	});

	app.post('/users', async (req, res) => {
		try {
			// Validate request data against Joi schema
			const { error, value } = userSchema.validate(req.body);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			// Create user in database using Sequelize
			const user = await User.create(value);

			return res.status(201).json(user);
		} catch (error) {
			console.error('Error creating user:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	});


	// app.get('/', apiKeyMiddleware, (req, res) => {

	// 	// TODO: 
	// 	// FIGURE OUT WHY this works: curl -H "X-API-KEY: wrong_or_missing_key" http://localhost:8080/

	// 	res.send('Hello, your API is up and running!');
	// });



	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});
}

init();