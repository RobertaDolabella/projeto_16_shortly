import res from "express/lib/response";
import Joi from "joi";
export default function(req, res){
    
const userInfo = req.body

const schemaUser = Joi.object({
    email: Joi.string().pattern(regexEmail).required(),
    senha:Joi.string().required(),
})

const {error} = schemaUser.validate(userInfo)

if(error){
    return res.send("Senha ou email incorreto.")
 
}
}