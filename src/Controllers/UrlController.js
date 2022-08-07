import { nanoid } from 'nanoid'
import connection from '../DBstrategy/postgres.js';
import dayjs from 'dayjs';

export async function CreateAShortening(req, res) {

    console.log("passou pelas validações")

    const user = res.locals.user;

    const { url } = req.body

    let shorten = nanoid()

    try {

        await connection.query('INSERT INTO "shortedLink" ("shortedLink","customerID", "URL") VALUES ($1,$2,$3)', [shorten, user.id, url])

        res.send(shorten).status(201)
    } catch {
        res.send("Algo deu errado.")
    }

}

export async function GetShorteningById(req, res) {

    const { id } = req.params;

    try {
        const { rows: shortly } = await connection.query('SELECT id, "shortedLink", "URL" FROM "shortedLink" WHERE id=$1', [id])

        const response = {
            id: shortly[0].id,
            "shortUrl": shortly[0].shortedLink,
            "url": shortly[0].URL
        }
        res.send(response)

    } catch {
        res.sendStatus(404)
    }

}

export async function GetToTheLink(req, res) {

    const { shortUrl } = req.params;
    console.log(shortUrl)
    try {

        const { rows: shortenId } = await connection.query('SELECT id, visualizationaCounter, "URL" FROM "shortedLink" WHERE "shortedLink" = $1', [shortUrl])

        if (shortenId.length < 1) {
            return res.sendStatus(404)
        }

        const data = dayjs().format('YYYY-MM-DDTHH:mm:ss')

        await connection.query('INSERT INTO visualizations ("shortedLinkId", date) VALUES ($1,$2)', [shortenId[0].id, data])

        const { rows } = await connection.query('SELECT COUNT(id) FROM visualizations WHERE "shortedLinkId" = $1', [shortenId[0].id])

        const counter = rows[0].count

        await connection.query('UPDATE "shortedLink" SET visualizationaCounter=$1 WHERE id = $2',[counter,shortenId[0].id ])
        
        console.log("vai mostrar a url")
        console.log(shortenId[0].URL)

        res.redirect(shortenId[0].URL, 302)

    } catch {
        res.send("algo errado")
    }


}

export async function DeleteLink(req, res){

    const { id } = req.params

    try{

        await connection.query('DELETE FROM "shortedLink" WHERE id = $1',[id])

        await connection.query('DELETE FROM visualizations WHERE "shortedLinkId" = $1', [id])


        res.send("Tudo certo, seu post foi deletado")
    }catch{
        res.send("Algo deu errado")
    }
}