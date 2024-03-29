import Joi from 'joi';

const postSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export default postSchema;
