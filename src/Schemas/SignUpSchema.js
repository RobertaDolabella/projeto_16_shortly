import Joi from "joi";

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(regexEmail).required(),
    password:Joi.string().required(),
    confirmPassword: Joi.string().required()
})

export default schemaSignUp;
