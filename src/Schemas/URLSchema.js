import Joi from "joi";

const schemaURL = Joi.object({
    url: Joi.string().uri().required()
})

export default schemaURL;