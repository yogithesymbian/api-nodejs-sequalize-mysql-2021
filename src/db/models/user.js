'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.user, {
      //   through: models.user_role,
      // });
      models.user.hasMany(models.score);
    }
  };
  user.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image_profile: DataTypes.STRING,
    hit: DataTypes.INTEGER,
    // hit_send_mail
    // hit_send_mail_expires
    delete_flag: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};