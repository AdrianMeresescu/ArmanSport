'use strict';

const { DataTypes, Model } = require('sequelize');

class ProductToWarehouse extends Model {}

module.exports.class = ProductToWarehouse;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_option_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'products_to_warehouses'
}