'use strict';

const { DataTypes, Model } = require('sequelize');

class Warehouse extends Model {}

module.exports.class = Warehouse;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    displayed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'warehouses'
}