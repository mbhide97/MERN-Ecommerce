import User from "../models/User.js";

let getAllUser=async(req,res)=>{

    try{
        let users=(await User.find().select('-password').sort({createdAt:-1}))

        return res.status(200).json({
            success:true,
            totalUsers:users.length,
            users
        })
    }
    catch(error){
        console.log(error);

         return res.status(500).json({
            success:false,
            msg:error.message,
        })
    
        
    }
}

let deleteUser=async(req,res)=>{
   try{

    let user=await User.findById(req.params.id);

    if(!user){
         return res.status(404).json({
        msg:" user not found",
    })
    }
     
    if(user.role==='admin'){
         return res.status(403).json({
        msg:" admin account cannot be deleted",
         success:false,
    })
    }
await User.findByIdAndDelete(req.params.id)

 return res.status(200).json({
            success:true,
            msg:"User deleted successfully"
        })
   }catch(error){
         return res.status(500).json({
        msg:" Error feching Single product",
        error:error.msg
       })
   }
}

export {getAllUser,deleteUser}
 