import Order from "../models/Order.js";
import Razorpay from 'razorpay';
import crypto from 'crypto'

let razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

const createOrder = async (req, res) => {
    try {
        console.log(req.body);

        const {
            customer,
            items,
            subtotal,
            delivery,
            payment,
            total
        } = req.body;

        if (
            !customer ||
             typeof customer !== "object" ||
             Array.isArray(customer) ||
            !Array.isArray(items) ||
            items.length === 0 ||
            subtotal === undefined ||
            delivery === undefined ||
            payment === undefined ||
            total === undefined
        ) {
            return res.status(400).json({
                msg: "Order Data Required..."
            });
        }

        if (!["COD", "ONLINE"].includes(payment)) {
            return res.status(400).json({
                msg: "Invalid payment method"
            });
        }

        const order = await Order.create({
            user: req.user.userId,
            customer,
            items,
            subtotal,
            delivery,
            payment,
            paymentStatus: "Pending",
            orderStatus: "Placed",
            total
        });

        return res.status(201).json({
            msg: "Order Placed...",
            order
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Error in Order",
            error: error.message
        });
    }
};

let myOrder=async(req,res)=>{
    try{
        let orders=await Order.find({
            user:req.user.userId
        }).sort({createdAt: -1})

        return res.status(200).json({
            success:true,
            orders
        })
    }
    catch(error){
       console.log(error);

       return res.status(500).json({
           msg:"failed to fetch",
           error:error.message
        })
       
    }
}

let razorpayOrder=async(req,res)=>{

    try{
        let {total}=req.body

         if(
            typeof total !== "number" || !Number.isFinite(total) || total <=0
         )
         {
            return res.status(400).json({
                msg:"not valid",
                success:false
            })
         }

         let rOrder=await razorpay.orders.create({
            amount:Math.round(total * 100),
            currency:"INR",
             
          })
          return res.status(200).json({
                success:true,
                order:rOrder,
                key:process.env.RAZORPAY_KEY_ID,
            })
    }catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Error in Razorpay format",
            error: error.message,
            success:false,
        });
    }
}

let verifyOrder=async (req,res)=>{

    try{
        let { razorpay_order_id, razorpay_payment_id,razorpay_signature}=req.body;
   

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){

        return res.status(400).json({
            success:false,
             msg: "missing verification",
        })

    }

let body = `${razorpay_order_id}|${razorpay_payment_id}`
    let cryptoSignature= crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');

    let hello=Buffer.from(cryptoSignature,"hex")

    let received=Buffer.from(razorpay_signature,"hex")

    if(hello.length !== received.length || !crypto.timingSafeEqual(hello,received))

        return res.status(400).json({
            success:false,
             msg: "Invalid signature",
        })


let payment=await razorpay.payments.fetch(razorpay_payment_id)

if (payment.order_id !== razorpay_order_id || payment.status !== "captured" || payment.currency !== "INR")
{
    return res.status(400).json({
            success:false,
             msg: "payment details not match",
        })
}
  return res.status(200).json({
            success:true,
            razorpay_order_id,
            razorpay_payment_id,
             paymentStatus:"Paid",
             msg: "payment verified successfully",
        })


}catch(error){
    console.log('error defined...');

    return res.status(500).json({
            success:false,
             msg: "payment verification failed..",
        })
    
}
  }


let saveVerifyPaymentOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      delivery,
      total,
      razorpay_order_id,
      razorpay_payment_id,
    } = req.body;

    // 1. Validate required order details
    if (
      !customer ||
      typeof customer !== "object" ||
      Array.isArray(customer) ||
      !Array.isArray(items) ||
      items.length === 0 ||
      subtotal === undefined ||
      delivery === undefined ||
      total === undefined ||
      !razorpay_order_id ||
      !razorpay_payment_id
    ) {
      return res.status(400).json({
        success: false,
        msg: "Order & payment details are missing",
      });
    }

    // 2. Fetch payment details
    const paymentDetails = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    if (
      paymentDetails.order_id !== razorpay_order_id ||
      paymentDetails.status !== "captured" ||
      paymentDetails.currency !== "INR"
    ) {
      return res.status(400).json({
        success: false,
        msg: "Payment details do not match",
      });
    }

    // 3. Verify Razorpay order amount and status
    const razorpayOrderDetails = await razorpay.orders.fetch(
      razorpay_order_id
    );

    if (
      razorpayOrderDetails.status !== "paid" ||
      paymentDetails.amount !== Math.round(Number(total) * 100) ||
      paymentDetails.amount !== razorpayOrderDetails.amount
    ) {
      return res.status(400).json({
        success: false,
        msg: "Payment amount verification failed",
      });
    }

    // 4. Check if this payment already has an order
    const existingOrder = await Order.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });

    if (existingOrder) {
      if (String(existingOrder.user) !== String(req.user.userId)) {
        return res.status(409).json({
          success: false,
          msg: "Payment is already linked to another order",
        });
      }

      return res.status(200).json({
        success: true,
        order: existingOrder,
        msg: "Order already saved",
      });
    }

    // 5. Save order in MongoDB
    const order = await Order.create({
      user: req.user.userId,
      customer,
      items,
      subtotal: Number(subtotal),
      delivery: Number(delivery),
      payment: "ONLINE",
      paymentStatus: 'Paid',
      orderStatus: "Placed",
      total: Number(total),
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    return res.status(201).json({
      success: true,
      order,
      msg: "Order saved successfully",
    });
  } catch (error) {
    console.error("Save Razorpay order error:", error);

    return res.status(500).json({
      success: false,
      msg: "Failed to save Razorpay order",
      error: error.message,
    });
  }
};

let getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

let updateOrderStatus = async (req, res) => {
  try {
    let { orderStatus } = req.body;

    let statusAllowed = [
      "Placed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!statusAllowed.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid order status"
      });
    }

    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      {
        new: true,
        runValidators: true
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Order status updated successfully",
      order
    });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

let deleteOrder = async (req, res) => {
  try {
    let order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Order deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};




export { createOrder,myOrder,razorpayOrder,verifyOrder,saveVerifyPaymentOrder,getAllOrders, updateOrderStatus ,deleteOrder};