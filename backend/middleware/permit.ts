import {NextFunction, Request, Response} from 'express';
import {RequestWithUser} from "./authCheck";

const permit = (...roles: string[]) =>{
    return (req: Request , res: Response , next: NextFunction) => {
        const user = (req as RequestWithUser).user


        if(!user ||  !roles.includes(user.role)){
            return res.status(403).send({error:'You are not admin'})
        }
        return next()
    }
}

export default permit;