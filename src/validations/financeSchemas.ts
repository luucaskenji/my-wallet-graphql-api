import joi from 'joi';

const financeInfo = joi.object({
  value: joi.string().pattern(/^[0-9]+,{1}[0-9]{2}$/).required(),
  description: joi.string().allow(''),
  type: joi.string().valid('INCOME', 'EXPENSE').required(),
});

export default { financeInfo };
