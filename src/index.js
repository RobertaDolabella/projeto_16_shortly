import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./Routers/UserRouter.js";
import UrlRouter from "./Routers/UrlRouter.js";
import RankingRouter from "./Routers/RankingRouter.js"

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors())

app.use(UserRouter)
app.use(UrlRouter)
app.use(RankingRouter)

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
