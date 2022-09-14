const yup = require('yup');

const UserValidator = yup.object().shape({
    fullname : yup.string().required("وارد کردن نام الزامیست"),
    email : yup.string().required("وارد کردن ایمیل الزامیست"),
    password : yup.string().required("وارد کردن ایمیل الزامیست").min(8 , "رمز عبور باید بیشتر از ۸ کاراکتر باشد"),
    confirmpassword : yup.string().required("وارد کردن ایمیل الزامیست").oneOf([yup.ref('password'), null], 'رمز عبور و تکرار ان باید یکسان باشند')
})


module.exports = UserValidator

