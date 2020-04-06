'use strict';

const { DataTypes, Model } = require('sequelize');

class OptionGroup extends Model {}

module.exports.class = OptionGroup;
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
    }
}
module.exports.config = {
    hasTimestamps: false,
    tableName: 'option_groups'
}