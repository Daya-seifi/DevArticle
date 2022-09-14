const jwt = require('jsonwebtoken');
const Verify = (req,res , next)=>{
    try {
        const UserStatus  = req.get('Authorization')
    if (!UserStatus) {
        res.status(422).json({message: "کاربر ثبت نام نکرده"})
    }
    const token = UserStatus.split(" ")[1]
    const decodedToken = jwt.verify(token , process.env.JWT_SECURITKEY)
    if (!decodedToken) {
        const error = new Error("شما مجوز کافی ندارید");
        error.status = 401;
        throw error;
    }
    console.log(decodedToken);
    
    req.userId = decodedToken.user.userId;
    next();
    } catch (error) {
        next(error)
    }

}

module.exports = Verify