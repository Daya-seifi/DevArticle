const AdminController = require("../controller/AdminController")
const Verify = require('../middleware/Verify');

const  router  = require("express");


const Router = router.Router()

Router.get("/AdminDashboard" , Verify , AdminController.GetAdminDashboard)

Router.put("/Changerole/process" , Verify , AdminController.BeAdmin)


Router.get("/deletePost/:id" , Verify , AdminController.DeleteCourseByAdmin)


module.exports = Router