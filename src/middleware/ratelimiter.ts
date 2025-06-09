import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextFunction , Request , Response } from "express";
import { point } from "drizzle-orm/pg-core";
import { duration } from "drizzle-orm/gel-core";


const ratelimiter = new RateLimiterMemory({
    points :10, // number of requests or hits at that endpoint
    duration : 60  // per  second (10 hits per minutes)

})
export const rateLimiterMiddleware =async(req:Request , res:Response , next:NextFunction) =>{
    try {
        await ratelimiter.consume(req.ip || 'unknown');
        console.log(`Rate Limit Check Passed for IP: ${req.ip}`)
        next ()
    } catch (error) {
        res.status(429).json({error:"Too Many requests , please try again later."})
        
    }
}
