const DBAdapter = require('./dbAdapter');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  //PG config here
});

class SQLAdapter extends DBAdapter {
  async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 8);
    // SQL logic to create userb
  }

  async findUserByUsername(username) {
    // SQL logic to find user by username
  }
}

module.exports = SQLAdapter;
