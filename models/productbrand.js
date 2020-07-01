'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductBrand.belongsTo(models.Product, {foreignKey: 'productId'});
      ProductBrand.belongsTo(models.Brand, {foreignKey: 'brandId'});
    }
  };
  ProductBrand.init({
    productId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductBrand',
  });
  return ProductBrand;
};