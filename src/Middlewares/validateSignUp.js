import schemaSignUp from "../Schemas/SignUpSchema.js";

export function validateSignUp(req, res, next) {
  const userInfo = req.body;
  const validation = schemaSignUp.validate(userInfo);
  if (validation.error) {
    return res.sendStatus(422); 
  }

  if(userInfo.password!==userInfo.confirmPassword){
    return res.send("A senha de confirmação não corresponde a senha").status(422); 
  }

  next();
}