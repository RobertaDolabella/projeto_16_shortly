import { Router } from "express";
import { GetRanking } from "../Controllers/RankingController.js";

const router = Router();

router.get('/ranking', GetRanking)

export default router;