import connection from "../DBstrategy/postgres.js";
import { v4 as uuid} from "uuid";
import bcrypt from "bcryptjs";


export async function SignUp(req, res){
    
    const {name, password, email} = req.body

    const senhaCrypt = bcrypt.hashSync(password, 10)

    try{
        console.log("entrou no try")
        await connection.query('INSERT INTO customers (name, email, password) VALUES ($1,$2,$3)', [name, email, senhaCrypt])
        console.log("PASSOU PELA QUERY")

        res.sendStatus(201)
    }catch{
        res.sendStatus(409)

    }

}
export async function SignIN(req, res){
    
    const {email, password} = req.body

    try{
        console.log("1")
         const {rows:user} = await connection.query('SELECT *FROM customers WHERE email = $1', [email])
         if(user.lenght<1){
             return res.sendStatus(401)
         }

         console.log("2")
         const senhaCrypt = user.password

         console.log("3")
         const validacaoSenha = bcrypt.compareSync(senha, senhaCrypt)

         if(!validacaoSenha){
            return res.sendStatus(401)
         }
         const token = uuid()
                 
        console.log(token)

        res.send(token)
    }catch{
        res.send("Algo deu errado.")
    }
}