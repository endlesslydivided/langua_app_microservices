import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {


    async use(req: Request, res: Response, next: NextFunction) 
    {
        try 
        {
            const cookie =req.header('cookie');
            req['accessToken'] = null;
            if(cookie)
            {
                const accessTokenString = cookie.split("; ").filter(x => x.startsWith('accessToken='))[0];
                if(accessTokenString)
                {
                    const accessToken = accessTokenString.split('accessToken=')[1];
                    if(accessToken)         
                    { 
                        req['accessToken'] = accessToken;
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