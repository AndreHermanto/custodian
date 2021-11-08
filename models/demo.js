"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class demo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  demo.init(
    {
      clinicalId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      sampleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "demo",
      tableName: "demo",
    }
  );
  return demo;
};
