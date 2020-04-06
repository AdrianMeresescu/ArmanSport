'use strict';

const { DataTypes, Model } = require('sequelize');

class Tax extends Model {
    TAX_PERCENT = 'percent';
    TAX_VALUE = 'value'
}

module.exports.class = Tax;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
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
    tableName: 'taxes'
}