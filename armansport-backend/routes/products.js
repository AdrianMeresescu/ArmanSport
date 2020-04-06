var express = require('express');
var router = express.Router();

const db = require('../database');
var { validateQuery } = require('../utils/validation');
var { getAllAvailableFields } = require('../utils/helpers');

const Product = db.models.Product;
const ProductDescription = db.models.ProductDescription;
const ProductOffer = db.models.ProductOffer;

const Manufacturer = db.models.Manufacturer;
const Tax = db.models.Tax;

const OptionGroup = db.models.OptionGroup;
const Option = db.models.Option;
const ProductOption = db.models.ProductOption;

const Warehouse = db.models.Warehouse;
const ProductToWarehouse = db.models.ProductToWarehouse;

const Category = db.models.Category;
const ProductToCategory = db.models.ProductToCategory;

router.get('/', async (req, res, next) => {
    await Product.findAll({ 
        include: [
            { model: ProductDescription, as: 'description' },
            { model: Manufacturer, as: 'manufacturer' },
            { model: Tax, as: 'tax' },
            { model: ProductOffer, as: 'offers' },
            {
                model: ProductOption, as: 'options',
                include: [
                    {
                        model: Option, as: 'option',
                        include: [{ model: OptionGroup, as: 'option_group' }],
                    },
                    {
                        model: ProductToWarehouse, as: 'product_in_warehouse',
                        include: [{ model: Warehouse, as: 'warehouse' }]
                    }
                ],
            },
            {
                model: ProductToCategory, as: 'categories',
                include: [{ model: Category, as: 'category' }]
            }
        ]
    }).then((result) => { res.status(200).send({ success: true, result: result }); return; })
        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/add_product', validateQuery(Product.rawAttributes),
                            validateQuery(ProductDescription.rawAttributes, ['product_id']),
                            async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(Product.rawAttributes, params);
    
    await Product.findOrCreate({ where: { code: params.code }, defaults: fields })
    .then(async (result) => {
        if(!result[1]) { res.status(200).send({ success: true, created: false }); return; }

        product_id = result[0].dataValues.id;
        fields = getAllAvailableFields(ProductDescription.rawAttributes, params);

        await ProductDescription.findOrCreate({ where: { product_id: product_id }, defaults: fields })
                            .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                            .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }).catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/update_product', async (req, res, next) => {
    params = req.body;

    product = await Product.findOne({ where: { id: params.product_id }, include: ['description'] })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(product) {
        productFields = getAllAvailableFields(Product.rawAttributes, params);
        productDescriptionFields = getAllAvailableFields(ProductDescription.rawAttributes, params)

        await product.update(productFields)
                    .then(await product.description.update(productDescriptionFields))
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/delete_product', async (req, res, next) => {
    params = req.body;

    await Product.destroy({ where: { id: params.product_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/product/add_option', validateQuery(ProductOption.rawAttributes), async (req, res, next) => {
    params = req.body;

    fields = getAllAvailableFields(ProductOption.rawAttributes, params);

    await ProductOption.findOrCreate({ where: { product_id: params.product_id, option_id: params.option_id }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] });return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/product/add_category', validateQuery(ProductToCategory.rawAttributes), async (req, res, next) => {
    params = req.body;

    fields = getAllAvailableFields(ProductToCategory.rawAttributes, params);

    await ProductToCategory.findOrCreate({ where: { product_id: params.product_id, category_id: params.category_id }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] });return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/product/add_offer', validateQuery(ProductOffer.rawAttributes), async (req, res, next) => {
    params = req.body;

    fields = getAllAvailableFields(ProductOffer.rawAttributes, params);

    await ProductOffer.findOrCreate({ where: { product_id: params.product_id }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] });return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

module.exports = router;