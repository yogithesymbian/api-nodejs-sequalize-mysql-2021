const config = require("../config/db.config.js");

// const Sequelize = require("sequelize");
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  // operatorsAliases: false, // deprecation
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  define: {
    "createdAt": "created_at",
    "updatedAt": "updated_at"
  } /*don't forget to add host, port, dialect, etc.*/
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// TODO : register the model
db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
// db.user = require("./user.model.js")(sequelize, Sequelize);
// db.role = require("./role.js")(sequelize, Sequelize);
// db.role = require("./role.model.js")(sequelize, Sequelize);
// db.post = require("./post.model.js")(sequelize, Sequelize);

// TODO : relation set
db.role.belongsToMany(db.user, {
  through: "user_roles",
  // foreignKey: "role_id",
  // otherKey: "user_id",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  // foreignKey: "user_id",
  // otherKey: "role_id",
});

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
