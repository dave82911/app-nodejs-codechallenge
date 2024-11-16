const BaseJoi = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');

const Joi = BaseJoi.extend(JoiDate);

const createTransaction = Joi.object({
  accountExternalIdDebit: Joi.string().required(),
  accountExternalIdCredit: Joi.string().required(),
  transferTypeId: Joi.number().integer().positive().required(),
  value: Joi.number().integer().positive().required(),
});

const validateTransaction = Joi.object({
  id: Joi.number().integer().positive().required(),
  account_external_id_debit: Joi.string().required(),
  account_external_id_credit: Joi.string().required(),
  transfer_type_id: Joi.number().integer().positive().allow(null).required(),
  value: Joi.number().integer().positive().required(),
  status: Joi.string().valid('pending', 'approved', 'rejected').required(),
  created_at: Joi.date().iso().required(),
  updated_at: Joi.date().iso().required(),
});

module.exports = {
  createTransaction,
  validateTransaction,
};
