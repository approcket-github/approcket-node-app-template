const cache = {};

const storeToken = (username, token) => {
  cache[username] = token;
};

const retrieveToken = (username) => {
  return cache[username];
};

module.exports = {
  storeToken,
  retrieveToken,
};
