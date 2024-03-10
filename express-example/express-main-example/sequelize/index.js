// The sequelize module exports several things, including the Sequelize constructor function which 
// is used to create an instance of Sequelize that connects to your database. By using curly braces {} in the require statement, 
// you're specifically extracting the Sequelize constructor from the module's exports.

const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

require('dotenv').config()

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'ecom.sqlite',
	logQueryParameters: true,
	benchmark: true
	// password:process.env.DB_PASSWORD
});


// User Model
const User = sequelize.define('user', {
	// Assuming id is automatically generated
	name: Sequelize.STRING,
	email: { type: Sequelize.STRING, unique: true },
	password_hash: Sequelize.STRING,
	gender_id: { type: Sequelize.INTEGER, allowNull: true },
	dob: Sequelize.DATEONLY,
	role_id: { type: Sequelize.INTEGER, allowNull: true },
	is_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
	is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
	// Timestamps added by default
}, {
	// options
	underscored: true

});

// Asynchronous function to fetch all users
async function fetchAllUsers() {
    try {
        // Fetch all users from the User model
        const users = await User.findAll();
        // Check if all users are instances of User model
        console.log(users.every(user => user instanceof User)); // true
        // Print fetched users
        console.log("All users:", JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Call the function to fetch all users
fetchAllUsers();


// User.create({
// 	name: 'Jane Doe',
// 	email: 'jane.doe@example.com',
// 	password_hash: 'somehashedpassword',
// 	gender_id: 1, // assuming you have gender IDs set up
// 	dob: new Date(1990, 1, 1), // Date of birth, for example, February 1, 1990
// 	role_id: 1, // assuming you have role IDs set up
// 	is_verified: true
// }).then(jane => {
// 	console.log('Jane\'s auto-generated ID:', jane.id);
// });

// import model definer functions from separate files. 
// Each model definer function is expected to define a model (i.e., a table in 
// the database) by calling methods on the sequelize instance, such as define.

// const modelDefiners = [
// 	require('./models/user.model'),
// 	// require('./models/instrument.model'),
// 	// require('./models/orchestra.model'),
// 	// Add more models here...
// 	// require('./models/item.model'),
// ];

// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
// 	modelDefiner(sequelize);
// }

// We execute any extra setup after the models are defined, such as adding associations.
// A common use case for this function is to define associations between models (e.g., foreign keys, 
// many-to-many relationships), adding indexes, or other database-level configurations that require
//  multiple models to be defined beforehand.

// applyExtraSetup(sequelize);

// This line exports the sequelize instance that was created and configured with your database connection settings. T
// ensure that you have a single shared instance of Sequelize ,avoiding issues like multiple connections.
module.exports = sequelize;



// Exports and Imports: Modules can export values, functions, or objects using the 
// module.exports or exports object. Other modules can then import these exports using the 
// require() function. This mechanism enables sharing code between modules and building larger 
// applications by composing smaller, reusable parts.


// Modules are loaded synchronously using the require() function, and the exported values are cached for subsequent imports.