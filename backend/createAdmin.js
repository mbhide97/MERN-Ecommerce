import mongoose from "mongoose";
import dotenv from'dotenv';
import bcrypt from "bcryptjs";
import User from './models/User.js';

dotenv.config()

let createAdmin=async ()=>{


    try{
        await mongoose.connect(process.env.MONGO_URI);

        let email="admin@gmail.com";
        let password="admin@1234";

        let existingAdmin=await User.findOne({email})

        if(existingAdmin){
            existingAdmin.role="admin"
            await existingAdmin.save();

            console.log('admin updated successfully')
        }
        else{
            let hashPassword=await bcrypt.hash(password,10)

            await User.create({
                name:'ShopAdmin',
                email,
                password:hashPassword,
                role:'admin'
            })
            console.log('admin created successfully')
        }
    }catch(error){
        console.log(error);
        
    }finally{
        await mongoose.disconnect();
    }
}
createAdmin();