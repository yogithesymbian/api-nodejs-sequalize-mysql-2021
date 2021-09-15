'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
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
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // const model = require(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;

    // db.user = require("./user.js")(sequelize, Sequelize);
    // const modelName = file.substring(0, file.indexOf('.'));
    // const modelPath = "./" + file;
    // console.log('model path : ', modelPath);
    // console.log('model name : ', modelName);
    // console.log('model db before : ', db.user_role);
    // db.user_role = require("./" + file);
    // console.log('model db after : ', db.user_role);
    // db.user = require()
    // const model = require(""+path.join(__dirname, file))(sequelize, Sequelize);
    // console.log('model : ', path.join(__dirname, file));
    // db[model.name] = model;
    // console.log('model : ', db[model.name]);
    // db.user = require("./user.js")(sequelize, Sequelize);
    // db.role = require("./role.js")(sequelize, Sequelize);
    // db.user_role = require("./user_role.js")(sequelize, Sequelize);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// TODO : register the model
// db.user = require("./user.js")(sequelize, Sequelize);
// db.role = require("./role.js")(sequelize, Sequelize);
// db.user = require("./user.model.js")(sequelize, Sequelize);
// db.role = require("./role.js")(sequelize, Sequelize);
// db.role = require("./role.model.js")(sequelize, Sequelize);
// db.post = require("./post.model.js")(sequelize, Sequelize);

// TODO : relation set
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   // foreignKey: "role_id",
//   // otherKey: "user_id",
// });

// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   // foreignKey: "user_id",
//   // otherKey: "role_id",
// });

module.exports = db;
