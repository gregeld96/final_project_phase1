'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCompany.belongsTo(models.Product, {foreignKey: 'productId'});
      ProductCompany.belongsTo(models.Company, {foreignKey: 'companyId'});
    }
  };
  ProductCompany.init({
    productId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCompany',
  });
  return ProductCompany;
};