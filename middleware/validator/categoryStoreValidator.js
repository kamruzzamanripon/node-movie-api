import Joi from 'joi';

export const categoryStoreValidator = (req, res, next) => {
  const schema = Joi.object({
   
    name: Joi.string()
    .required().
    messages({
        'string.name': 'Name is required'
       }),
       
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }
 
  next();
};
