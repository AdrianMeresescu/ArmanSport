'use strict';

require('dotenv').config();

const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DB_LOCAL_NAME,
                                process.env.DB_LOCAL_USERNAME,
                                process.env.DB_LOCAL_PASSWORD,
                                {
                                    host: process.env.DB_LOCAL_HOST,
                                    dialect: 'mysql'
                                });

connection.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

const definitions = require('./models');
const models = {};
for (const name in definitions) {
    models[name] = definitions[name].class;
    models[name].init(
        definitions[name].columns,
        {
            sequelize: connection,
            tableName: definitions[name].config.tableName,
            timestamps: definitions[name].config.hasTimestamps ? true : false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
}

models.Product.hasOne(models.ProductDescription, { as: 'description', foreignKey: 'product_id' });
models.Product.hasMany(models.ProductOption, { as: 'options', foreignKey: 'product_id' });
models.Product.hasMany(models.ProductToCategory, { as: 'categories', foreignKey: 'product_id' });
models.Product.hasMany(models.ProductOffer, { as: 'offers', foreignKey: 'product_id' });
models.Product.belongsTo(models.Tax, { as: 'tax', foreignKey: 'tax_id', otherKey: 'id' });
models.Product.belongsTo(models.Manufacturer, { as: 'manufacturer', foreignKey: 'manufacturer_id', otherKey: 'id' });

models.OptionGroup.hasMany(models.Option, { as: 'options', foreignKey: 'option_group_id' });
models.Option.belongsTo(models.OptionGroup, { as: 'option_group', foreignKey: 'option_group_id', otherKey: 'id' });

models.ProductOption.hasOne(models.Option, { as: 'option', foreignKey: 'id' });
models.ProductOption.hasMany(models.ProductToWarehouse, { as: 'product_in_warehouse', foreignKey: 'product_option_id'});

models.Warehouse.hasMany(models.ProductToWarehouse, { as: 'products_in_warehouse', foreignKey: 'warehouse_id' });
models.ProductToWarehouse.belongsTo(models.Warehouse, { as: 'warehouse', foreignKey: 'warehouse_id' });

models.Category.hasMany(models.ProductToCategory, { as: 'products_in_category', foreignKey: 'category_id' });
models.ProductToCategory.belongsTo(models.Category, { as: 'category', foreignKey: 'category_id', otherKey: 'id' });

const db = {};
db.connection = connection;
db.models = models;

module.exports = db;
