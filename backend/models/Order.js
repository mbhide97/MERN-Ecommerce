import mongoose from "mongoose";

let orderSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    customer:{
         name:{
            type:String,
            required:true
        },

        email:{
            type:String,
            required:true
        },

        number:{
            type:Number,
            required:true
        },

        address:{
            type:String,
            required:true
        },

    },

    items:[
        {product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },

         name:{
            type:String,
            required:true
        },

         image:{
            type:String,
            required:true
        },

        price:{
            type:Number,
            required:true
        },

         quantity:{
            type:Number,
            required:true,
            min:1
        },
    
    }
    ],

    subtotal:{
            type:Number,
            required:true
        },
    delivery:{
            type:Number,
            required:true
        },
     payment:{
            type:String,
            required:true,
            enum:["COD","ONLINE"]
        },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed"],
        default:"Pending",
    },

    razorpay_order_id:{
       type:String,
       default:null,
    },

    razorpay_payment_id:{
        type:String,
        default:null,
    },
 

    total:{
            type:Number,
            required:true
        },

    orderStatus:{
        type:String,
        enum:["Placed","Shipped","Delivered","Cancelling"],
        default:"Placed"
    },
},

{
 timestamps:true
        
}
)

let Order=mongoose.model("Order",orderSchema)

export default Order;