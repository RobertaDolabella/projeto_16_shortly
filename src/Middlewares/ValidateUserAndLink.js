
import { url } from "inspector";
import connection from "../DBstrategy/postgres.js";

export default async function ValidateUserAndLink(req, res, next){

    const user = res.locals.user;

    const { id} = req.params

        const {rows:urlUser} = await connection.query('SELECT "customerID", id FROM "shortedLink" WHERE id=$1', [id])

        console.log(urlUser)

        if(urlUser.length<1){
            return res.sendStatus(404)
        }

        if(urlUser[0].customerID!==user.id){
            res.sendStatus(401)
        }

    next()
}