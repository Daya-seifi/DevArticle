const yup = require('yup');

const CMValidator = yup.object().shape({
   body : yup.string().required("Enter a body is required")
})


module.exports = CMValidator

