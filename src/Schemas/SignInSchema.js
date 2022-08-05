import Joi from "joi";

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const schemaSignIn = Joi.object({
    email: Joi.string().pattern(regexEmail).required(),
    password:Joi.string().required(),
})

export default schemaSignIn;
