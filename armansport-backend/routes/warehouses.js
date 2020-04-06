var express = require('express');
var router = express.Router();

const db = require('../database');
var { validateQuery } = require('../utils/validation');
var { getAllAvailableFields } = require('../utils/helpers');

const Warehouse = db.models.Warehouse;

router.get('/', async (req, res, next) => {
    await Warehouse.findAll()
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/add_warehouse', validateQuery(Warehouse.rawAttributes), async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(Warehouse.rawAttributes, params);
    
    await Warehouse.findOrCreate({ where: { name: params.name }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/update_warehouse', async (req, res, next) => {
    params = req.body;

    warehouse = await Warehouse.findOne({ where: { id: params.warehouse_id } })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(warehouse) {
        warehouseFields = getAllAvailableFields(Warehouse.rawAttributes, params);

        await warehouse.update(warehouseFields)
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/delete_warehouse', async (req, res, next) => {
    params = req.body;

    await Warehouse.destroy({ where: { id: params.warehouse_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});


module.exports = router