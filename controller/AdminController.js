const blogs = require('../model/Blogs');
const users = require('../model/Users');
const { StatusCodes:HttpStatus} = require("http-status-codes");

class AdminController {
    //This is not a real measure
    //این معیار واقعی نیست و نمادین است 
    BeAdmin = async (req,res)=>{
        try {
            const NewAdmin = await users.findById(req.userId)
        if (!NewAdmin.isAdmin) {
            await NewAdmin.updateOne({
                $set : {
                    isAdmin : true
                }
            })
            res.status(HttpStatus.ACCEPTED).json({
                message : "Change role process done Succesfully"
            })
        }
        else{
            res.status(HttpStatus.UNAUTHORIZED).json({
                message : "You was Admin!!!!!You Can Not Changing"
            })
        }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
     IsAdmin =async (req,res,next) => {
        try {
            const User = await users.findById(req.userId)
            if (User.isAdmin) {
                return true
            }
            else{
                return false
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
     GetAdminDashboard = async (req,res ,next)=>{
           const AdminChecker = this.IsAdmin(req,res,next)
           if (AdminChecker) {
              const Blogs = await blogs.find().populate("author")
              res.status(HttpStatus.OK).json({Blogs})
           }
           else{
            res.status(HttpStatus.UNAUTHORIZED).json({message : "you doesnt have permission for this Work"})
           }
     }
     DeleteCourseByAdmin = async (req,res,next)=> {
            const Adminchecker = this.IsAdmin(req,res,next)
            try {
                if (Adminchecker) {
            const {id} = req.params
            const blog = await blogs.findById(id)
            if (typeof blog !== 'undefined') {
                if (blog.author.toString() === req.userId) {
                fs.unlinkSync(`${approot}/public/uploads/thumbnails/${blog.thumbnail}`)
                await blog.remove()
                res.status(HttpStatus.OK).json({message : 'Blog Deleted Succesfully'})
                } 
                    }
                        }
                    else{
                        res.status(HttpStatus.NOT_FOUND).json({message : "there isnt any post"})
                   
 }
            }
                catch(error){
                   console.log(error);
        }
      }

    }


module.exports = new AdminController()