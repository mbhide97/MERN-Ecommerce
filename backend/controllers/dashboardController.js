import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";


let dashboardStatus = async (req, res) => {
    try {
        let [totalUser, totalProducts, totalOrders, totalRevenue] = await Promise.all([User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([{
            $match: {
                paymentStatus: "Paid"
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" }
            }
        },
        ])]);

        let revenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

        return res.status(200).json({
            success: true,
            status: {
                totalUsers: totalUser,
                totalProducts,
                totalOrders,
                totalRevenue: revenue,
            }

        })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            msg: "not defined dashboard"
        })
    }
}

export { dashboardStatus }