"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class acute extends Model {
    static associate(models) {
      // define association here
    }
  }
  acute.init(
    {
      clinicalId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      sampleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "acute_care",
      tableName: "acute_care",
    }
  );
  return acute;
};
