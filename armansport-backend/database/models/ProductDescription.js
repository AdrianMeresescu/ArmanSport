'use strict';

const { DataTypes, Model } = require('sequelize');

class ProductDescription extends Model {}

module.exports.class = ProductDescription;
module.exports.columns = {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    labels: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    meta_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meta_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    keywords: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'products_description'
}