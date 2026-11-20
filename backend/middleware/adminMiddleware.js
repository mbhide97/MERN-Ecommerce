
let adminMiddleware=(req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({
                msg:"login first"
            })
        }
        if(req.user.role !== "admin"){
             return res.status(403).json({
                msg:"login admin only"
            })
        }
        next()
    }catch(error){
         return res.status(500).json({
                msg:"server error"
            })
    }
}
export default adminMiddleware;