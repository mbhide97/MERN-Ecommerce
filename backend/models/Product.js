import mongoose from 'mongoose'


let ProductSchema=new mongoose.Schema(
    {

        image:{
             type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },
        price:{
             type:Number,
            required:true
        },

        category:{
            type:String,
            required:true
        }
    },
    {
            timestamps:true
        
    }
    
)

let Product=mongoose.model("Product",ProductSchema)


export default Product