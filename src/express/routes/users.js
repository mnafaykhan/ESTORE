// this is User route's controller file
// defines all the handlers that will used set up API endpoints

const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const users = await models.user.findAll();
	res.status(200).json(users);
};


async function signup(req, res) {
	// Implement user signup logic here
  }
  
  async function login(req, res) {
	// Implement user login logic here
  }
  

module.exports = {
	getAll,
	signup,
	login
};
