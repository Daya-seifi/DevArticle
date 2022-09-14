const {Router} = require('express');
const verify = require('../middleware/Verify');
const DashboardHandler = require("../controller/DashboardController")



const router = Router()

router.get('/dashboard', verify ,DashboardHandler.Dashboard )

router.post('/dashboard/CreatePost', verify ,DashboardHandler.CreatePostHandler )

router.put('/dashboard/editePost/:id', verify ,DashboardHandler.EditPostHandler )

router.delete('/dashboard/deletePost/:id', verify ,DashboardHandler.DeletePost)


router.post('/posts/like/:id', verify ,DashboardHandler.LikePost)


router.post('/posts/unlike/:id', verify ,DashboardHandler.UnLikePost )


router.post('/posts/comment/:id', verify ,DashboardHandler.CommentHandler )

router.delete('/posts/DeleteComment/:id', verify ,DashboardHandler.CommentDeleteHandler )


module.exports = router;