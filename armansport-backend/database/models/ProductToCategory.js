'use strict';

const { DataTypes, Model } = require('sequelize');

class ProductToCategory extends Model {}

module.exports.class = ProductToCategory;
module.exports.columns = {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'products_to_categories'
}