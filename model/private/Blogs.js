const yup = require('yup');

const BlogSchema  = yup.object().shape({

    title : yup.string().required("وارد کردن تیتر الزامیست").min(4 , "تیتر حداقل باید ۴ کارکتر باشد").max(255),
    description : yup.string().required("وارد کردن تیتر الزامیست").min(4 , "تیتر حداقل باید ۴ کارکتر باشد").max(255),
    thumbnail: yup.object().shape({
        name: yup.string().required("عکس بند انگشتی الزامی می باشد"),
        size: yup.number().max(3000000, "عکس نباید بیشتر از 3 مگابایت باشد"),
        mimetype: yup.mixed().oneOf(
            ["image/jpeg", "image/png"],
            "تنها پسوندهای png و jpeg پشتیبانی می شوند"
        ),
    })

})

module.exports = BlogSchema