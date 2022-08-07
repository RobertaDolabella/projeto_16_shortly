import { Router } from "express";
import ValidateToken from "../Middlewares/validateToken.js";
import { CreateAShortening, GetShorteningById, GetToTheLink, DeleteLink  } from "../Controllers/UrlController.js";
import IsLoggedIn from "../Middlewares/isLoggedIn.js";
import ValidateUrl from "../Middlewares/ValidateUrl.js";
import ValidateUserAndLink from "../Middlewares/ValidateUserAndLink.js"

const router = Router()

router.post('/urls/shorten',ValidateToken, IsLoggedIn, ValidateUrl, CreateAShortening)
router.get('/urls/:id',GetShorteningById)
router.get('/urls/open/:shortUrl',GetToTheLink)
router.delete('/urls/:id', ValidateToken, IsLoggedIn,ValidateUserAndLink ,DeleteLink)

export default router;