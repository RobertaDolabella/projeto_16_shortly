import schemaURL from "../Schemas/URLSchema.js"

export default function ValidateUrl(req, res, next){

    const url = req.body;

    const validation = schemaURL.validate(url);
    
    if (validation.error) {
      return res.sendStatus(422); 
    }

    next()
}

