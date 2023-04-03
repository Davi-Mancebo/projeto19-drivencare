import joi from "joi";

const publishSchema = joi.object({
  userId:joi.number(),
  description: joi.string(),
  url: joi.string().uri().required(),
  editedAt:joi.string()
});

export default publishSchema;