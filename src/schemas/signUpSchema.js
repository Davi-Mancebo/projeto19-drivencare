import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().min(1).email().required(),
  name: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
  ismedic: joi.boolean().default(false),
  speciality: joi.string()
});

export default signUpSchema;
