'use strict';

const { DataTypes, Model } = require('sequelize');

class ProductOption extends Model {}

module.exports.class = ProductOption;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    value_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'value'
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'products_options'
}
