const user = require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

class LoginHandler {
    LoginHandler  = async (req,res , next)=>{
        try {
            const {email , password} = req.body
            const User = await user.findOne({ email })   
            if (!User) {
                return res.status(404).send({messsage  : "کاربری با این ایمیل یافت نشد"})
            }
            const IsEqual = await bcrypt.compare(password , User.password)
            if (IsEqual) {
                console.log(User.id);
                const token = jwt.sign({
                    user : {
                        userId : User.id
                    }
                } , process.env.JWT_SECURITKEY)
                res.status(200).json({message : token})
            }
            else{
                res.status(422).json({message : "ایمیل یا رمز عبور اشتباه است"})
            }
            } catch (error) {
                next(error)
            }
        }
}

module.exports = new LoginHandler()

