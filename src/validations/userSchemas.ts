import joi from 'joi';

const signUp = joi.object({
  firstName: joi.string().max(15).required(),
  lastName: joi.string().max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(15).required(),
});

export default {
  signUp,
};
