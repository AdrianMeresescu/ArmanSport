var express = require('express');
var router = express.Router();

const db = require('../database');
var { validateQuery } = require('../utils/validation');
var { getAllAvailableFields } = require('../utils/helpers');

const Tax = db.models.Tax;

router.get('/', async (req, res, next) => {
    await Tax.findAll()
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/add_tax', validateQuery(Tax.rawAttributes), async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(Tax.rawAttributes, params);
    
    await Tax.findOrCreate({ where: { value_type: params.value_type, value: params.value }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/update_tax', async (req, res, next) => {
    params = req.body;

    tax = await Tax.findOne({ where: { id: params.tax_id } })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(tax) {
        taxFields = getAllAvailableFields(Tax.rawAttributes, params);

        await tax.update(taxFields)
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/delete_tax', async (req, res, next) => {
    params = req.body;

    await Tax.destroy({ where: { id: params.tax_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

module.exports = router;