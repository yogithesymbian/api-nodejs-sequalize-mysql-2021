'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.role.belongsToMany(models.user, {
        through: models.user_role,
        // foreignKey: "role_id",
        // otherKey: "user_id",
      });
      models.user.belongsToMany(models.role, {
        through: models.user_role,
        // foreignKey: "user_id",
        // otherKey: "role_id",
      });
    }
  };
  user_role.init({
    delete_flag: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user_role',
    underscored: true,
  });
  return user_role;
};