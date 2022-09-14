const {RegisterHandler} = require("../controller/RegisterController")

const  router  = require("express");


const Router = router.Router()

Router.post("/register" , RegisterHandler)

module.exports = Router