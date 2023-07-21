const passport= require("passport");
const plm= require("passport-local-mongoose");


module.exports.isLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){

        req.flash("error", "You need to Log-In first!")
         return res.redirect("/login");   
    }

    next();

}