// We execute any extra setup after the models are defined, such as adding associations.
// A common use case for this function is to define associations between models (e.g., foreign keys, 
// many-to-many relationships), adding indexes, or other database-level configurations that require
//  multiple models to be defined beforehand.
function applyExtraSetup(sequelize) {
	const { instrument, orchestra, item, user } = sequelize.models;

	// instrument table includes a foreign key column linking each instrument to an orchestra.
	orchestra.hasMany(instrument);
	// , affirming the existence of the foreign key in the instrument table that points to an orchestra.
	instrument.belongsTo(orchestra);
	item.belongsTo(user);


}

module.exports = { applyExtraSetup };
