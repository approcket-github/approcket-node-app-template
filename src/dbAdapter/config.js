const dbType = process.env.DB_TYPE || 'mongo';  // or 'mysql'

let DbAdapter;
if (dbType === 'mongo') {
  DbAdapter = require('./mongoDbAdapter');
} else if (dbType === 'mysql') {
  DbAdapter = require('./mysqlDbAdapter');
} else {
  throw new Error('Unsupported db type');
}

module.exports = {
  dbAdapter: new DbAdapter(),
};
