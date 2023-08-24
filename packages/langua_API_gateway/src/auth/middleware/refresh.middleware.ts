import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {


    async use(req: Request, res: Response, next: NextFunction) 
    {
        try 
        {
            const cookie =req.header('cookie');
            req['refreshToken'] = null;
            if(cookie)
            {
                const refreshTokenString = cookie.split("; ").filter(x => x.startsWith('refreshToken='))[0];
                if(refreshTokenString)
                {
                    const refreshToken = refreshTokenString.split('refreshToken=')[1];
                    if(refreshToken)         
                    { 
                        req['refreshToken'] = refreshToken;
                    }
                }     
            }
            next();       
        } 
        catch (e) 
        {
            next();       
        }
    } 
}