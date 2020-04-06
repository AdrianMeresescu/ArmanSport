'use strict';

const { DataTypes, Model } = require('sequelize');

class ProductOffer extends Model {}

module.exports.class = ProductOffer;
module.exports.columns = {
    product_id: {
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
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'products_offers'
}