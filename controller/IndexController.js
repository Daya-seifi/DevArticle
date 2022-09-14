const blogs  = require('../model/Blogs');
const comments = require('../model/Comments');
const jwt = require('jsonwebtoken');

class IndexController{
    GetDashboard = async (req,res)=>{
        
        try {
         const NewstBlog = await blogs.find().sort({"createdAt" : -1})  
         const FavoriteBlogs = await blogs.find().sort({"likecount" : -1})

         res.status(200).json({NewstBlog , FavoriteBlogs})
        } catch (error) {
         console.log(error);
        }
     }
    SearchHandler = async (req,res)=>{
        try {
         const {title} = req.query
         const Searchedblogs = await blogs.find({$text: {$search : title}})
         console.log(req.query);
     
         res.status(200).json({ Searchedblogs})
        } catch (error) {
         console.log(error);
        }
     }
     ShowExclusivePost = async (req,res)=>{
        try {

         const {id} = req.params
         const post = await blogs.findById(id).populate("author")
         const comment = await comments.find({
          post : id
         })
        res.status(200).json({post , comment })
        } catch (error) {
         console.log(error);
        }
     }
     
}

module.exports = new IndexController()