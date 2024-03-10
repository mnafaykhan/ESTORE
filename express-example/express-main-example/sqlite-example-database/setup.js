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

	//	Similarly, this line inserts several orchestras into the database, using their names to identify them.
	// await sequelize.models.orchestra.bulkCreate([
	// 	{ name: 'Jalisco Philharmonic' },
	// 	{ name: 'Symphony No. 4' },
	// 	{ name: 'Symphony No. 8' },
	// ]);

	// Let's create random instruments for each orchestra

	// await sequelize.models.item.create({ score: "Opera 1", ownerId: 1 });

	// The findAll generates a standard SELECT query which will retrieve 
	// all entries from the table (unless restricted by something like a where clause, for example).
	/* 
		// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#specifying-attributes-for-select-queries
		for (const orchestra of await sequelize.models.orchestra.findAll()) {
			for (let i = 0; i < 10; i++) {
				const type = pickRandom([
					'violin',
					'trombone',
					'flute',
					'harp',
					'trumpet',
					'piano',
					'guitar',
					'pipe organ',
				]);
	
	// Sequelize automatically provides methods to help manage 
	// this relationship. For your hasMany relationship from Orchestra
	//  to Instrument, Sequelize adds a method on Orchestra instances
	//   to create Instrument instances that are automatically associated
	//    with the Orchestra.
	
	
	// https://sequelize.org/docs/v7/associations/has-many/#foreign-key-targets-sourcekey
	// All associations add methods to the source model1. These methods can be used to fetch, create, and delete associated models.
				await orchestra.createInstrument({
					type: type,
					purchaseDate: randomDate()
				});
	
	// The commented-out code shows an alternative way to achieve the same result, by 
	// explicitly creating an instrument and setting its orchestraId.
	
				// The following would be equivalent in this case:
				// await sequelize.models.instrument.create({
				// 	type: type,
				// 	purchaseDate: randomDate(),
				// 	orchestraId: orchestra.id
				// });
			}
		}
		 */

	console.log('Done!');
}

// reset();
