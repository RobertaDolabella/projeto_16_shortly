import connection from "../DBstrategy/postgres.js"

export async function GetRanking(req, res){

    try{
        const {rows} = await connection.query('SELECT c.id, c.name, COUNT(s."shortedLink") AS "linksCount", SUM(s.visualizationacounter) AS "visitCount" FROM customers c JOIN "shortedLink" s ON c.id= s."customerID" GROUP BY c.id ORDER BY "visitCount" DESC LIMIT 10')

        res.send(rows).status(200)

    }catch{
        res.sendStatus(400)
    }
}
