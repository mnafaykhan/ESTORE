// The sequelize module exports several things, including the Sequelize constructor function which 
// is used to create an instance of Sequelize that connects to your database. By using curly braces {} in the require statement, 
// you're specifically extracting the Sequelize constructor from the module's exports.

const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'sqlite-example-database/example-db.sqlite',
	logQueryParameters: true,
	benchmark: true
});


// import model definer functions from separate files. 
	// Each model definer function is expected to define a model (i.e., a table in 
	// the database) by calling methods on the sequelize instance, such as define.

const modelDefiners = [
	require('./models/user.model'),
	require('./models/item.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
// A common use case for this function is to define associations between models (e.g., foreign keys, 
// many-to-many relationships), adding indexes, or other database-level configurations that require
//  multiple models to be defined beforehand.

applyExtraSetup(sequelize);

// This line exports the sequelize instance that was created and configured with your database connection settings. T
// ensure that you have a single shared instance of Sequelize ,avoiding issues like multiple connections.
module.exports = sequelize;



// Exports and Imports: Modules can export values, functions, or objects using the 
// module.exports or exports object. Other modules can then import these exports using the 
// require() function. This mechanism enables sharing code between modules and building larger 
// applications by composing smaller, reusable parts.


// Modules are loaded synchronously using the require() function, and the exported values are cached for subsequent imports.