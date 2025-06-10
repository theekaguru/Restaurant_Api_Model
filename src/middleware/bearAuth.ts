import jwt from "jsonwebtoken"
import { Request, Response , NextFunction} from "express";
import dotenv from "dotenv"


dotenv.config()

declare global{
  namespace Express{
    interface Request{
      user?:DecodedToken
    }
  }
}

type DecodedToken = {
     User_Id:number,
     Email: string,
     FullName: string,
     userType: string,
     exp: number
}



//authentication middleware

export const verifyToken =async(token:string , secret:string) =>{
  try {
    const decoded = jwt.verify(token , secret) as DecodedToken
    return decoded; 
  } catch (error) {
    return null; 
  }

}

//authorization Middleware
export const authMiddleware = async (req:Request , res:Response , next:NextFunction , requiredRoles:string) =>{
   const token = req.header('Authorization')
   if(!token){
    res.status(401).json({error:"Authorization Header is Missing"});
    return;
   }

   const decodedToken =await verifyToken(token , process.env.JWT_SECRET as string)
     if (!decodedToken){
      res.status(401).json({error:"invalid or expired token⌛"})
     } 

     const userType =decodedToken?.userType;
     if( requiredRoles === "all" && (userType ==="admin" || userType ==="member" || userType ==="driver"  || userType==="owner")){
      if(decodedToken?.userType === "admin" || decodedToken?.userType=== "member"){
        req.user === decodedToken;
        next();
        return;
      }
     } else if(userType === requiredRoles){
      req.user === decodedToken;
      next();
      return;
      
     }else{
      res.status(403).json({error:"Forbidden: You do not have permission to access ❌❌ this resource"})
     }
}  

// middleware to check if user is admin

export const adminRoleAuth = async(req:Request , res:Response , next:NextFunction) => await authMiddleware(req , res, next, "admin")
export const memberRoleAuth = async(req:Request , res:Response , next:NextFunction) => await authMiddleware(req , res, next, "member")
export const driverRoleAuth = async(req:Request , res:Response , next:NextFunction) => await authMiddleware(req , res, next, "driver")
export const ownerRoleAuth = async(req:Request , res:Response , next:NextFunction) => await authMiddleware(req , res, next, "owner")
export const allRoleAuth = async(req:Request , res:Response , next:NextFunction) => await authMiddleware(req , res, next, "all")