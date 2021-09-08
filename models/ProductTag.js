const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      // Reference the Product model's ID
      references: {
        model: 'Product',
        key: 'id',
        unique: false,
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      // Reference the Tag model's id
      references: {
        model: 'Tag',
        key: 'id',
        unique: false,
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
