const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Content = require("../models/Content");
const Blog = require("../models/Blog");
const { appendFile } = require("fs");
const cloudinary = require("cloudinary").v2;


router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({author : `${req.user._id}`}).populate('image').populate('author').select("-headings -paragraphs -video");
    // console.log(blogs);
    res.render('products/manage.ejs', {blogs : blogs});
});

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    const blog = await Blog.findOne({_id: `${id}`}).populate('author').populate('image').populate('video');
    console.log("blog printed");
    res.render('products/showBlog.ejs', {blog: blog});
});

//get edit form
router.get("/:id/edit" ,async(req, res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.render("products/edit" , {blog});
});


//update a blog
router.patch("/:id" ,async(req,res)=>{
    const {title,desc,headingInput,paragraphInput} = req.body;
    console.log(req.body);
    const {id} = req.params;

    await Blog.findByIdAndUpdate(id , {title,desc,headingInput,paragraphInput});

    req.flash("success", "your product has been updated");
    res.redirect('/admin/manage');
 })

//delete a blog
router.delete('/:id',async(req,res,next)=>{
    const {id}=req.params;
    await Blog.findOneAndDelete({_id: `${id}`})
    console.log("Blog Deleted");
    //const blogs= await Blog.find();
    res.redirect('/admin/manage');
})

module.exports = router;