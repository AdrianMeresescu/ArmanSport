'use strict';

const { DataTypes, Model } = require('sequelize');

class Manufacturer extends Model {}

module.exports.class = Manufacturer;
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
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'manufacturers'
}