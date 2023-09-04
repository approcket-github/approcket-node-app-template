const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  username: 'root',
  password: 'root',
  database: 'mydatabase',
});

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // Bcrypt will make the hashed password longer
    },
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
