function getAllAvailableFields(modelFields, requestFields) {
    availableFields = {};

    for(const field of Object.keys(modelFields)) {
        if(requestFields[field]) availableFields[field] = requestFields[field];
    }

    return availableFields;
}


function setAllAvailableFields(modelFields, availableFields) {
    modelFields = {};

    for(const field of Object.keys(modelFields)) {
        if(availableFields[field]) modelFields.dataValues[field] = availableFields[field];
    }

    return modelFields;
}

module.exports.getAllAvailableFields = getAllAvailableFields;
module.exports.setAllAvailableFields = setAllAvailableFields;