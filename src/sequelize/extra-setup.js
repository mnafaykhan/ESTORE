// We execute any extra setup after the models are defined, such as adding associations.
// A common use case for this function is to define associations between models (e.g., foreign keys, 
// many-to-many relationships), adding indexes, or other database-level configurations that require
//  multiple models to be defined beforehand.
function applyExtraSetup(sequelize) {
	const { item, user } = sequelize.models;

	item.belongsTo(user);


}

module.exports = { applyExtraSetup };
