var express = require('express');
var router = express.Router();

const db = require('../database');
var { validateQuery } = require('../utils/validation');
var { getAllAvailableFields } = require('../utils/helpers');

const Option = db.models.Option;
const OptionGroup = db.models.OptionGroup;

router.get('/', async (req, res, next) => {
    await Option.findAll()
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/add_option', validateQuery(Option.rawAttributes), async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(Option.rawAttributes, params);
    
    await Option.findOrCreate({ where: { option_group_id: params.option_group_id, name: params.name }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/update_option', async (req, res, next) => {
    params = req.body;

    option = await Option.findOne({ where: { id: params.option_id } })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(option) {
        optionFields = getAllAvailableFields(Option.rawAttributes, params);

        await option.update(optionFields)
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/delete_option', async (req, res, next) => {
    params = req.body;

    await Option.destroy({ where: { id: params.option_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.get('/groups', async (req, res, next) => {
    await OptionGroup.findAll()
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.get('/groups/group_options/:id', async (req, res, next) => {
    params = req.params;

    await OptionGroup.findAll({ where: { id: params.id }, include: [ 'options' ] })
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
})

router.post('/groups/add_option_group', validateQuery(OptionGroup.rawAttributes), async (req, res, next) => {
    params = req.body;
    fields = getAllAvailableFields(OptionGroup.rawAttributes, params);
    
    await OptionGroup.findOrCreate({ where: { name: params.name }, defaults: fields })
                    .then((result) => { res.status(200).send({ success: true, created: result[1], result: result[0] }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

router.post('/groups/update_option_group', async (req, res, next) => {
    params = req.body;

    optionGroup = await OptionGroup.findOne({ where: { id: params.option_group_id } })
                        .catch((error) => { res.status(500).send({ success: false, error: error }); return; });

    if(optionGroup) {
        optionGroupFields = getAllAvailableFields(Option.rawAttributes, params);

        await optionGroup.update(optionGroupFields)
                    .then((result) => { res.status(200).send({ success: true, result: result }); return; })
                    .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
    }
});

router.post('/groups/delete_option_group', async (req, res, next) => {
    params = req.body;

    await OptionGroup.destroy({ where: { id: params.option_group_id } })
                .then((result) => { res.status(200).send({ success: true, result: result}); return; })
                .catch((error) => { res.status(500).send({ success: false, error: error }); return; });
});

module.exports = router