// this is item route's controller file
// defines all the handlers that will used set up API endpoints

const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const items = await models.item.findAll();
	res.status(200).json(items);
};


module.exports = {
	getAll,
};
