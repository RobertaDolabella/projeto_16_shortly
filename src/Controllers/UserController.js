import connection from "../DBstrategy/postgres.js";
import { v4 as uuid} from "uuid";
import bcrypt from "bcrypt";


export async function SignUp(req, res){
    
    const {name, password, email} = req.body

    const senhaCrypt = bcrypt.hashSync(password, 10)

    console.log(senhaCrypt)

    try{

        await connection.query('INSERT INTO customers (name, email, password) VALUES ($1,$2,$3);', [name, email, senhaCrypt])

        res.sendStatus(201)
    }catch{
        res.sendStatus(409)

    }

}
export async function SignIN(req, res){
    
    const {email, password} = req.body

    try{

         const {rows:user} = await connection.query('SELECT *FROM customers WHERE email = $1', [email])
         if(user.lenght<1){
             return res.sendStatus(401)
         }

         const senhaCrypt = user[0].password

         console.log(senhaCrypt)

         const validacaoSenha = bcrypt.compareSync(password, senhaCrypt)

         console.log(validacaoSenha)

         if(!validacaoSenha){
            return res.sendStatus(401)
         }
         const token = uuid()

         const { rows }=  await connection.query('UPDATE customers SET token = $1, "isLoggedIn" = $2 WHERE email=$3', [token, true, email])
                 
        res.send(token)
    }catch{
        res.send("Algo deu errado.")
    }
}

export async function GetUser(req, res){

    const { id, name } = res.locals.user;

    try{

        const {rows: info} = await connection.query('SELECT id, "shortedLink" AS shortUrl, "URL"AS url ,visualizationacounter AS "visitCount" FROM "shortedLink" WHERE "customerID"= $1', [id])

        const {rows: totalViews} = await connection.query('SELECT SUM(visualizationacounter) FROM "shortedLink"')

        console.log(totalViews)

        const response = {
            id,
            name, 
            "visitCount": totalViews[0].sum,
            "shortenedUrls": info
        }
res.send(response)
    }catch{
        res.send("deu ruim")
    }

}

// {
//   "name": "roberta",
//   "email": "roberta@mail.com",
//   "password": "12345678",
//   "confirmPassword": "12345678"
// }

// {
//     "email": "roberta@mail.com",
//     "password": "12345678"
//   }