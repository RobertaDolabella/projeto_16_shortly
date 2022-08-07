
import connection from "../DBstrategy/postgres.js"

export default async function ValidateToken(req,res, next){
 
    const { authorization} = req.headers

    const token = authorization?.replace("Bearer ", "")

    const {rows: user} = await connection.query('SELECT * FROM customers WHERE token = $1', [token])

    if(user.length<1){
        return res.sendStatus(401)
    }

    res.locals.user= user[0];

    next()
}

