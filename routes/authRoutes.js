const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport")



//get register page
router.get("/register", (req,res)=>{

    res.render("auth/signup")
})


router.post('/register', async(req, res) => {
  const { username, password, email } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        // handle error (email already registered)
        req.flash('error', 'Email already registered');
        res.redirect('/register');
      } else {
        const user = new User({ username, email });
        user.created_on = new Date().toLocaleDateString();
        return User.register(user, password);
      }
    })
    .then((newUser) => {
      console.log(newUser);
      req.flash('success', 'You have Registered Successfully');
      res.redirect('/login');
    })
    .catch((err) => {
      req.flash('error', 'Some error occured while sign up, Please try again!');
    });
});




router.get("/login",(req,res)=>{

    res.render("auth/login")

})


// Login user into the session
router.post("/login", passport.authenticate("local", {

     failureRedirect: "/login" ,
     failureFlash: "Login error,please try again!"

}), (req,res)=>{

    req.flash("success", `${req.user.username.toUpperCase()}, your login was successfull`)

    res.redirect("/admin")

})

// logout user from session
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', 'GoodBye, see you again!');
      res.redirect('/login');
    });
  });


router.get('/blogs', function(req, res, next) {
  res.render('products/blogs.ejs');
});

module.exports=router;