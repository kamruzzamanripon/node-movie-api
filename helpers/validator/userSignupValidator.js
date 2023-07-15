import Joi from 'joi';

export const userSignupValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must contain only alphanumeric characters',
      }),
      password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Password confirmation must match the password',
        'any.required': 'Password confirmation is required',
      }),
      job: Joi.string().optional(),
    
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }
 
  next();
};
