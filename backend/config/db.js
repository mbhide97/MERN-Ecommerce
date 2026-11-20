import mongoose from "mongoose";

let connectDB=async ()=>{


    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connection successfully run..");
        
    }catch(error){
        console.log("Error in mongodb connection: ",error.message);
        process.exit()
        
    };
    
    
}

export default connectDB;