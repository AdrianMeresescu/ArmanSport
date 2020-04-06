var express = require('express');
var router = express.Router();

const db = require('../database');
var { validateQuery } = require('../utils/validation');
var { getAllAvailableFields } = require('../utils/helpers');

const Category = db.models.Category;

router.get('/', async (req, res, next) => {
    await Category.findAll()
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/add_category', validateQuery(Category.rawAttributes), async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(Category.rawAttributes, params);
    
    await Category.findOrCreate({ where: { name: params.name }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/update_category', async (req, res, next) => {
    params = req.body;

    category = await Category.findOne({ where: { id: params.category_id } })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(category) {
        categoryFields = getAllAvailableFields(Category.rawAttributes, params);

        await category.update(categoryFields)
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/delete_category', async (req, res, next) => {
    params = req.body;

    await Category.destroy({ where: { id: params.category_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

module.exports = router;