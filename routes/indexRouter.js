const { Router } = require('express');
const router = Router()
const IndexController = require('../controller/IndexController');



router.get("/" , IndexController.GetDashboard)

router.get("/post/:id" , IndexController.ShowExclusivePost)

router.get('/search' ,IndexController.SearchHandler)

module.exports = router