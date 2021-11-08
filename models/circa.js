"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class circa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  circa.init(
    {
      clinicalId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      sampleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "circa",
      tableName: "circa",
    }
  );
  return circa;
};
