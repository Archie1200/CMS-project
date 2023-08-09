const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Content = require("../models/Content");
const Blog = require("../models/Blog");
const { appendFile } = require("fs");
const cloudinary = require("cloudinary").v2;

router.get("/", async (req, res, next) => {
  const blogs = await Blog.find({ author: `${req.user._id}` })
    .populate("image")
    .populate("author")
    .select("-headings -paragraphs -video");
  // console.log(blogs);
  res.render("products/manage.ejs", { blogs: blogs });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: `${id}` })
    .populate("author")
    .populate("image")
    .populate("video");
  console.log("blog printed");
  res.render("products/showBlog.ejs", { blog: blog });
});

//get edit form
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("products/edit", { blog });
});

//update a blog
router.patch("/:id", async (req, res) => {
  const { title, desc, headingInput, paragraphInput } = req.body;

  const { id } = req.params;
  if (req.body.defaultImage) {
    await Blog.findByIdAndUpdate(id, {
      image: null,
    });
  }
  if (req.body.defaultVideo) {
    await Blog.findByIdAndUpdate(id, {
      video: null,
    });
  }
//   console.log(req.files);
  if (!req.body.defaultImage && req.files) {
    var blog = await Blog.findOne({ _id: `${id}` });
    if ("blog-image" in req.files) {
      const blogImage = req.files["blog-image"];
      if (blogImage) {
        blogImage.name = Date.now() + blogImage.name;
        await cloudinary.uploader
          .upload(blogImage.tempFilePath)
          .then(async (result) => {
            // console.log(result);
            const content1 = new Content({
              public_id: result.public_id,
              url: result.secure_url,
            });

            await content1
              .save()
              .then(async () => {
                console.log("image saved!!");
                if (blog.image != null) {
                  blog = await blog.populate("image");
                //   console.log(blog);
                  const imgId = blog.image.public_id;
                  await cloudinary.uploader.destroy(imgId, {
                      type: "upload",
                      resource_type: "image",
                    })
                    .then((result) => {
                      console.log("old image deleted");
                    });
                }
                await Blog.findByIdAndUpdate(id, {
                  image: content1._id,
                });
              })
              .catch((err) => {
                console.log(err);
                console.log("error occured in saving image!!");
              });
          })
          .catch((err) => {
            req.flash("error", "Error in uploading Image!");
            res.redirect("/upload");
          });
      }
    }
    
    if (!req.body.defaultVideo && "blog-video" in req.files) {
      const blogVideo = req.files["blog-video"];
      if (blogVideo) {
        blogVideo.name = Date.now() + blogVideo.name;
        await cloudinary.uploader
          .upload(blogVideo.tempFilePath, { resource_type: "video" })
          .then(async (result) => {
            // console.log(result.secure_url);

            const content2 = new Content({
              public_id: result.public_id,
              url: result.secure_url,
            });

            await content2
              .save()
              .then(async () => {
                console.log("video saved!!");

                if (blog.video != null) {
                    blog = await blog.populate("video");
                    const videoId = blog.video.public_id;
                    await cloudinary.uploader.destroy(videoId, {
                            type: "upload",
                            resource_type: "video",
                        })
                        .then(() => {
                            console.log("old video deleted!");
                        });
                }
                await Blog.findByIdAndUpdate(id, {
                    video: content2._id,
                  });

              })
              .catch((err) => {
                console.log("error occured in saving video!!");
                console.log(err);
              });
          })
          .catch((err) => {
            req.flash("Error in uploading video!");
            res.redirect("/upload");
          });
      }
    }
  }

  await Blog.findByIdAndUpdate(id, {
    title: title,
    description: desc,
    headings: headingInput,
    paragraphs: paragraphInput,
  });

  req.flash("success", "your blog has been updated successfully!");
  res.redirect("/admin/manage");
});

//delete a blog
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  var blog = Blog.findById({_id : `${id}`});
  if (blog.image != null) {
    const imgId = blog.image.public_id;
    await cloudinary.uploader.destroy(imgId, {
        type: "upload",
        resource_type: "image",
    })
    .then((result) => {
        console.log("old image deleted");
    });
  }
  if (blog.video != null) {
    const videoId = blog.video.public_id;
    await cloudinary.uploader.destroy(videoId, {
        type: "upload",
        resource_type: "video",
    })
    .then(() => {
        console.log("video deleted from data base!");
    });
  }
  await Blog.findOneAndDelete({ _id: `${id}` });
  console.log("Blog Deleted");
  //const blogs= await Blog.find();
  req.flash('success', "Blog successfully deleted✅");
  res.redirect("/admin/manage");
});

module.exports = router;
