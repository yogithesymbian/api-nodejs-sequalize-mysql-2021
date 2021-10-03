'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  question.init({
    name: DataTypes.STRING,
    life: DataTypes.STRING,
    path_image: DataTypes.TEXT,
    delete_flag: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'question',
    underscored: true,
  });
  return question;
};