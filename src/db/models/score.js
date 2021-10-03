'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.user.hasMany(models.score);
      models.score.belongsTo(models.user);
    }
  };
  score.init({
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    score: DataTypes.DOUBLE,
    delete_flag: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'score',
    underscored: true,
  });
  return score;
};