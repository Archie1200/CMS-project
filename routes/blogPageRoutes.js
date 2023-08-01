const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Content = require("../models/Content");
const Blog = require("../models/Blog");
const { appendFile } = require("fs");
const cloudinary = require("cloudinary").v2;


router.get('/', async (req, res, next) => {
    const blogs = await Blog.find().populate('image').populate('author').select("-headings -paragraphs -video");
    console.log(blogs);
    res.render('products/blogs.ejs', {blogs : blogs});
});

router.get('/blog/:id', function (req, res, next) {
    const {id} = req.params;
})





module.exports = router;