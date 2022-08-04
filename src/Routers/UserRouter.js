import { Router } from "express";
import { SignIN, SignUp } from "../Controllers/UserController";

const router = Router()

router.post('/signup', SignUp)
router.post('/signin', SignIN)

export default router;