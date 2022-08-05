import { Router } from "express";
import { SignIN, SignUp } from "../Controllers/UserController.js";
import { validateSignIn } from "../Middlewares/validateSignIn.js";
import { validateSignUp } from "../Middlewares/validateSignUp.js";


const router = Router()

router.post('/signup', validateSignUp, SignUp)
router.post('/signin',validateSignIn, SignIN)

export default router;