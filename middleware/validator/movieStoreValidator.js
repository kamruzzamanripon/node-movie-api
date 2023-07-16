import Joi from 'joi';

export const movieStoreValidator = (req, res, next) => {
  const schema = Joi.object({
   
    title: Joi.string()
    .required().
    messages({
        'string.name': 'Name is required'
       }),
    category_id: Joi.string()
    .required().
    messages({
        'string.category_id': 'Category Name is required'
    }), 
    image: Joi.string()
    .required().
    messages({
        'string.image': 'image is required'
    }), 
      
       
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }
 
  next();
};
