'use strict';

const { DataTypes, Model } = require('sequelize');

class Product extends Model {
    getProductCode() {
        return this.code
    }
}

module.exports.class = Product;
module.exports.columns = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    manufacturer_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    tax_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    out_of_stock_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date_available: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1
    }
}
module.exports.config = {
    hasTimestamps: true,
    tableName: 'products'
}