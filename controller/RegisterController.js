const User = require('../model/Users');
const bcrypt = require('bcryptjs');

class RegisterController {
    RegisterHandler = async (req,res,next)=>{
        try {
            const {fullname , email , password }= req.body
            const IsValid = await User.Validating(req.body)
            console.log(IsValid);
            const HashedPassword = await bcrypt.hash(password , 10)
            await User.create({fullname , email , password : HashedPassword})
            res.status(201).json({message : "کاربر با موفقیت ساخته شد"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController()
