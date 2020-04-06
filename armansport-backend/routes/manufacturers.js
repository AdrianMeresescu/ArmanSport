var express = require('express');
var router = express.Router();

const db = require('../database');
var { validateQuery } = require('../utils/validation');
var { getAllAvailableFields } = require('../utils/helpers');

const Manufacturer = db.models.Manufacturer;

router.get('/', async (req, res, next) => {
    await Manufacturer.findAll()
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/add_manufacturer', validateQuery(Manufacturer.rawAttributes), async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(Manufacturer.rawAttributes, params);
    
    await Manufacturer.findOrCreate({ where: { name: params.name }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/update_manufacturer', async (req, res, next) => {
    params = req.body;

    manufacturer = await Manufacturer.findOne({ where: { id: params.manufacturer_id } })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(manufacturer) {
        manufacturerFields = getAllAvailableFields(Manufacturer.rawAttributes, params);

        await manufacturer.update(manufacturerFields)
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/delete_manufacturer', async (req, res, next) => {
    params = req.body;

    await Manufacturer.destroy({ where: { id: params.manufacturer_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

module.exports = router;