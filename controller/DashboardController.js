const Blogs = require('../model/Blogs');
const shortid = require('shortid');
const approot = require('app-root-path');
const sharp = require('sharp');
const fs = require('fs');
const { StatusCodes:HttpStatus} = require("http-status-codes")
const Comments = require('../model/Comments');
const comment = require('../model/Comments');

class Dashboard{
    Dashboard =async (req,res)=>{
        try {
            const UsersPosts = await Blogs.find({
                author : req.userId
            }) 
            res.status(HttpStatus.OK).json({UsersPosts})
        } catch (error) {
            console.log(error);
        }
    }

    CreatePostHandler =  async (req,res)=>{
        const thumbnail = req.files ? req.files.thumbnail : {}
        const filename = `${shortid.generate()}__${thumbnail.name}`
        const uploadpath = `${approot}/public/uploads/thumbnails/${filename}`
        try {
            req.body = {...req.body , thumbnail}
            const {title , description } = req.body
            await sharp(thumbnail.data).jpeg({quality : 60}).toFile(uploadpath)
            const blog = await Blogs.create({
                author : req.userId,
                description,
                thumbnail : filename,
                title
            })
            res.status(HttpStatus.CREATED).json({blog})
        } catch (error) {
            console.log(error);
        }
    }
    EditPostHandler = async (req,res , next)=>{
        const thumbnail = req.files ? req.files.thumbnail : {}
        const filename = `${shortid.generate()}__${thumbnail.name}`
        const uploadpath = `${approot}/public/uploads/thumbnails/${filename}`
        try {
            const blog = await Blogs.findById(req.params.id)
            if (typeof blog !== 'undefined') {
                console.log(blog.author);
                console.log(req.userId);
                if (blog.author.toString() === req.userId) {
                req.body = {...req.body , thumbnail}
                const {title , description } = req.body
                await sharp(thumbnail.data).jpeg({quality : 60}).toFile(uploadpath)
                fs.unlinkSync(`${approot}/public/uploads/thumbnails/${blog.thumbnail}`)
                blog.title = title
                blog.description = description
                blog.thumbnail = filename
                blog.updatedAt = Date.now()
                await blog.save()
                res.status(HttpStatus.OK).json({message : 'بلاگ با موفقیت تغغیر یافت'})
            }
            else{
                res.status(HttpStatus.NOT_FOUND).json({message : "بستی نیست"})
            }
            }
            else{
                res.status(HttpStatus.UNAUTHORIZED).json({message : "شما نمیتوانید این بست را ادیت کنید"})
            }       
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    DeletePost = async (req,res , next)=>{
        try {
            const blog = await Blogs.findById(req.params.id)
            if (typeof blog !== 'undefined') {
                if (blog.author.toString() === req.userId) {
                fs.unlinkSync(`${approot}/public/uploads/thumbnails/${blog.thumbnail}`)
                await blog.remove()
                res.status(HttpStatus.OK).json({message : 'بلاگ با موفقیت حذف  یافت'})
            }
            else{
                res.status(HttpStatus.NOT_FOUND).json({message : "بستی نیست"})
            }
                
            }
            else{
    
                res.status(HttpStatus.UNAUTHORIZED).json({message : "شما نمیتوانید این بست را ادیت کنید"})
            }       
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    LikePost = async (req,res , next)=>{
        const IsLoggedIn = req.get("Authorization")
        try {
                const blog = await Blogs.findById(req.params.id)
            if (typeof blog !== 'undefined' ) {
                const NotAbleToLike =  blog.likers.includes(req.userId)
                console.log(NotAbleToLike);
                if (NotAbleToLike) {
                    res.status(HttpStatus.BAD_REQUEST).json({message : "کاربر قبلا بست را لایک کرده"})
                }
                else{
                    
                    await blog.updateOne({
                        $push : {
                           likers : req.userId
                        },
                        $inc : {
                            likecount : 1
                        }

                    })
                    
                    res.status(HttpStatus.OK).json({message : "لایک شد"})
                }
            }
            else{
                res.status(HttpStatus.NOT_FOUND).json({message : "بستی نیست"})
            }
            }
                 
         catch (error) {
            console.log(error);
            next(error)
        }
    }
    
    UnLikePost = async (req,res , next)=>{
        try {
            const blog = await Blogs.findById(req.params.id)
            if (typeof blog !== 'undefined' ) {
                const Able =  blog.likers.includes(req.userId)
    
                console.log(Able);
                if (!Able) {
                    res.status(HttpStatus.BAD_REQUEST).json({message : "کاربر اصلا بست را لایک نکرده"})
                }
                else{
                    const index = blog.likers.indexOf(req.userId);
                    
                    await blog.update({
                        $pull : {
                            likers : req.userId
                        },
                        $inc : {
                            likecount : -1
                        }
                    })
                    res.status(HttpStatus.OK).json({message : "انلایک شد"})
                }
            }
            else{
                res.status(HttpStatus.NOT_FOUND).json({message : "بستی نیست"})
            }
            }
                 
         catch (error) {
            console.log(error);
            next(error)
        }
    }
    CommentHandler = async (req,res) => {
        const {body} = req.body
        const {id} = req.params
          try {
            await comment.CMvalidating(req.body)
            const NewComment = await comment.create({
                body,
                writer : req.userId,
                post  : id

            })
            res.status(HttpStatus.CREATED).json({NewComment })
          } catch (error) {
            console.log(error);
            next(error)
          }
        }

        CommentDeleteHandler = async (req,res,next)=>{
            try {
                const {id} = req.params
                const DeletedComment = await comment.findByIdAndDelete(id)
                res.status(200).json({DeletedComment})
            } catch (error) {
                console.log(error);
            }
        }
    }


module.exports = new Dashboard()








