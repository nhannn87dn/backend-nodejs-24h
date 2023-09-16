const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getAll = {
  query: Joi.object().keys({
    page: Joi.number().optional()
  }),
};



const getById = {
    params: Joi.object().keys({
      id: Joi.custom(objectId).required(),
    }),
};



const deleteById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};


  
//Thêm mới danh mục
const create = {
  body: Joi.object().keys({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().max(500).required(),
  }),
};


const updateById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(4).max(50).required(),
    description: Joi.string().max(500).required(),
  }),
};


module.exports = {
    create,
    getById,
    deleteById,
    updateById,
    getAll
};