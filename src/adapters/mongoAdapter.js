const DBAdapter = require('./dbAdapter');
const User = require('../models/userModelMongoDB');

class MongoAdapter extends DBAdapter {
  async createUser(username, password) {
    const user = new User({ username, password });
    await user.save();
    return user;
  }

  async findUserByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = MongoAdapter;
