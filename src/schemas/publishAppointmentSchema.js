import Joi from "joi"
export const appoitmentSchema  = Joi.object({
    date: Joi.date().required(),
    time: Joi.date().required(),
})
