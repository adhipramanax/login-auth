"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car.belongsTo(models.user, {
        foreignKey: "created_by",
        as: "createdBy",
      });

      car.belongsTo(models.user, {
        foreignKey: "updated_by",
        as: "updatedBy",
      });

      car.belongsTo(models.user, {
        foreignKey: "deleted_by",
        as: "deletedBy",
      });
    }
  }
  car.init(
    {
      name: DataTypes.STRING,
      url_image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      transmission: DataTypes.STRING,
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "car",
    }
  );
  return car;
};
