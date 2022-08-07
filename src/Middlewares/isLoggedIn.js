
export default function IsLoggedIn(req, res, next){

    const user = res.locals.user;

    if(user.IsLoggedIn===false){
        return res.sendStatus(401)
    }

    next()
}

