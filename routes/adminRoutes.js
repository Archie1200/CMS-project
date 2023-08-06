const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Content = require("../models/Content");
const Blog = require("../models/Blog");
const { error } = require("console");
const cloudinary = require("cloudinary").v2;

router.get("/", (req, res) => {
  const user = req.user;
  console.log(user);
  res.render("products/admin.ejs", { user });
});

router.get("/update", (req, res) => {
  const user = req.user;
  console.log(JSON.stringify(user));
  res.render("products/update_profile.ejs", { user });
});
router.get("/upload", (req, res) => {
  res.render("products/upload.ejs");
});
router.get("/manage", (req, res) => {
  res.render("products/manage.ejs");
});
router.get("/managePassword", (req, res) => {
  res.render("products/managePassword.ejs");
});

router.post("/update", (req, res) => {
  const updated_admin = req.body;
  const { profile_pic } = req.files;
  console.log(profile_pic);
  const title = req.body.title;
  profile_pic.name = Date.now() + profile_pic.name;

  cloudinary.uploader.upload(
    profile_pic.tempFilePath,
    async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error uploading image to Cloudinary");
      }
      console.log(result);

      try {
        const user = req.user;
        user.fullname.firstname = updated_admin.fname;
        user.fullname.lastname = updated_admin.lname;
        user.mobile_no = updated_admin.mobile_no;
        user.profilePictureUrl = result.secure_url;

        // Await for the admin to be saved
        req.user.save();
      } catch (err) {
        console.error(err);
      }
    }
  );
  res.redirect("/");
});

//change password route
router.post("/changePassword", async (req, res) => {
  const user = req.user;
  console.log(req.body);
  const oldPassword = await req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (req.user && (await req.user.changePassword)) {
    req.user.changePassword(oldPassword, newPassword, function (err) {
      if (err) {
        req.flash("error", "Please input correct credentials!!");
        res.redirect("/managePassword");
      } else {
        user.save();
        console.log("Password is updated!!!");
        req.flash("success", "Password is updated ✅");
        res.redirect("/managePassword");
      }
    });
  } else {
    req.flash("error", "some error occured!!");
    res.redirect("/managePassword");
  }
});

//upload blog routes
router.post("/upload",  async (req, res, next) => {
  console.log(req.body);

  if (req.user.fullname.firstname.length === 0) {
    console.log("entered if block....sorryyyyyy");
    req.flash('error', "Please update the Author name before uploading the blog!!");
    res.redirect('/admin/upload');
  }
  else{
    console.log("this is the user data after upload");
  console.log(req.user);
  console.log(req.files);

  var blogImagePublicId = "";
  var blogVideoPublicId = "";
  var blogImageUrl = "";
  var blogVideoUrl = "";

  var content1 = null;
  var content2 = null;

  if (req.files != null && "blog-image" in req.files) {
    const blogImage = req.files["blog-image"];
    if (blogImage) {
      blogImage.name = Date.now() + blogImage.name;
      await cloudinary.uploader
        .upload(blogImage.tempFilePath)
        .then(async (result) => {
          // console.log(result);
          content1 = new Content({
            public_id: result.public_id,
            url: result.secure_url,
          });
        
          await content1
            .save()
            .then(() => {
              console.log("image saved!!");
            })
            .catch((err) => {
              console.log("error occured in saving image!!");
            });
        })
        .catch((err) => {
          req.flash("error","Error in uploading Image!");
          res.redirect("/upload");
        });
    }
  }


  if (req.files != null && "blog-video" in req.files) {
    const blogVideo = req.files["blog-video"];
    if (blogVideo) {
      blogVideo.name = Date.now() + blogVideo.name;
      await cloudinary.uploader
        .upload(blogVideo.tempFilePath, { resource_type: "video" })
        .then(async (result) => {
          // console.log(result.secure_url);

          content2 = new Content({
            public_id: result.public_id,
            url: result.secure_url,
          });
        
          await content2
            .save()
            .then(() => {
              console.log("video saved!!");
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

  var content1Id = content1 === null ? null : content1._id;
  var content2Id = content2 === null ? null : content2._id;


  const blog = new Blog({
    title: req.body.title,
    description: req.body.desc,
    headings: req.body.headingInput,
    paragraphs: req.body.paragraphInput,
    image: content1Id,
    video: content2Id,
    author: req.user._id,
    published_on: new Date().toLocaleDateString("de-DE")
  });

  await blog
    .save()
    .then(() => {
      req.flash("success", "Blog Uploaded Successfully👍");
      res.redirect("/admin/upload");
    })
    .catch((e) => {
      req.flash("error", "Something went wrong!, Upload Unsuccessful❌");
      console.log(e);
      res.redirect("/admin/upload");
    });
  }

  
});

module.exports = router;
