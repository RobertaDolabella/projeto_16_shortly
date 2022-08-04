import res from "express/lib/response";
import Joi from "joi";

export default function(req, res){
    
const userInfo = req.body

const {senha, confirmacao} = userInfo

if(senha!==confirmacao){
    return res.send("Confirmação de senha incorreta.")
}

const schemaUser = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().pattern(regexEmail).required(),
    senha:Joi.string().required(),
    confirmacao: Joi.string(senha)
})

const {error} = schemaUser.validate(userInfo)

if(error){
    return res.send("Algo errado. Por favor, verifique os campos")
 
}
}