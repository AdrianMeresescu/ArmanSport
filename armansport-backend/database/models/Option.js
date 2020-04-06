'use strict';

const { DataTypes, Model } = require('sequelize');

class Option extends Model {}

module.exports.class = Option;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    option_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'options'
}