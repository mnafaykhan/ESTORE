const os = require("os");
const { generateEmailAuthToken } = require("./authHelper");


// Function to compose the verification link with token and IP
let composeLink = async (email) => {

  let token = await generateEmailAuthToken(email);

  return token;
};

module.exports = composeLink;
