import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


let register = async (req, res) => {

    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                msg: "required all data.."
            })
        }

        let userExit = await User.findOne({ email });

        if (userExit) {
            return res.status(400).json({
                msg: "user already exists..."
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            name,
            email,
            password: hashPassword
        });

        let token = jwt.sign({
            userId: user._id,
            email: user.email,
            role:user.role,
        },
            process.env.JWT_SECRETE,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({
            msg: "Register successfully...",
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
            }
        });

    } catch (error) {
        
         console.log(error);
         
        return res.status(500).json({
            msg: "server error",
             error: error.message
        })
    }
}




let login = async (req, res) => {

    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email.."
            })
        }

        let passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) {
            return res.status(401).json({
                msg: "Invalid password..."
            })
        }

        let token = jwt.sign({
            userId: user._id,
            email: user.email,
            role:user.role || "user",
        },
            process.env.JWT_SECRETE,
            {
                expiresIn: "1d"
            }
        );


        return res.status(200).json({
            msg: "login successfully...",
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role:user.role || "user",
            }
        })


    } catch (error) {

        return res.status(500).json({
            msg: "server error"

        })

    }
}
export {register,login};


