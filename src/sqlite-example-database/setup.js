const sequelize = require('../sequelize');
const { pickRandom, randomDate } = require('./helpers/random');

// called before doing express bringup in npm start to refresh clean state DB  

async function reset() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');


// synchronizes all models with the database, effectively recreating the tables. The { force: true } 
// option ensures that if the tables already exist, they will be dropped and recreated, 
// resulting in a clean database slate.
	await sequelize.sync({ force: true });

	
// Here, the script uses the bulkCreate method to insert multiple user records into the database at once. The users are identified by their usernames.
	await sequelize.models.user.bulkCreate([
		{ username: 'jack-sparrow' },
		{ username: 'white-beard' },
		{ username: 'black-beard' },
		{ username: 'brown-beard' },
	]);

	await sequelize.models.item.create({ score: "Opera 1", ownerId: 1 });


	console.log('Done!');
}

reset();
