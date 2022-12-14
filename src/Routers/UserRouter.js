import { Router } from "express";
import { SignIn, SignUp, GetUser } from "../Controllers/UserController.js";
import { validateSignIn } from "../Middlewares/validateSignIn.js";
import { validateSignUp } from "../Middlewares/validateSignUp.js";
import ValidateToken from "../Middlewares/validateToken.js";


const router = Router()

router.post('/signup', validateSignUp, SignUp)
router.post('/signin',validateSignIn, SignIn)
router.get('/users/me',ValidateToken, GetUser)

export default router;
