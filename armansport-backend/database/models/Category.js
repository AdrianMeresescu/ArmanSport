'use strict';

const { DataTypes, Model } = require('sequelize');

class Category extends Model {}

module.exports.class = Category;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'categories'
}