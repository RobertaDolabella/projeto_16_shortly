import schemaSignIn from "../Schemas/SignInSchema.js";

export function validateSignIn(req, res, next) {
  const userInfo = req.body;
  const validation = schemaSignIn.validate(userInfo);
  if (validation.error) {
    return res.sendStatus(422); 
  }

  next();
}
