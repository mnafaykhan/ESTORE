const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('user', {
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
	});
};
// const { DataTypes } = require('sequelize');

// // We export a function that defines the model.
// // This function will automatically receive as parameter the Sequelize connection object.
// module.exports = (sequelize) => {
// 	sequelize.define('user', {
// 		// The following specification of the 'id' attribute could be omitted
// 		// since it is the default.
// 		id: {
// 			allowNull: false,
// 			autoIncrement: true,
// 			primaryKey: true,
// 			type: DataTypes.INTEGER
// 		},
// 		username: {
// 			allowNull: false,
// 			type: DataTypes.STRING,
// 			unique: true,
// 			validate: {
// 				// We require usernames to have length of at least 3, and
// 				// only use letters, numbers and underscores.
// 				is: /^\w{3,}$/
// 			}
// 		},
// 	});
// };

// const User = sequelize.define('user', {
// 	// Assuming id is automatically generated
// 	name: Sequelize.STRING,
// 	email: { type: Sequelize.STRING, unique: true },
// 	password_hash: Sequelize.STRING,
// 	gender_id: { type: Sequelize.INTEGER, allowNull: true },
// 	dob: Sequelize.DATEONLY,
// 	role_id: { type: Sequelize.INTEGER, allowNull: true },
// 	is_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
// 	is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
// 	// Timestamps added by default
// }, {
// 	// options
// });
