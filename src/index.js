import express from "express";
import cors from "cors";
import UserRouter from "./Routers/UserRouter.js";

const app = express()

dotenv.config()

app.use(express().json())
app.use(cors())

app.use(UserRouter)

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
