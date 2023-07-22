// if(process.env.NODE_ENV != "production"){

//   require("dotenv").config({ path: "./config.env"})
// }

var express = require('express'),
  engine = require('ejs-mate'),
  app = express();
  const path = require('path');
  const ejs = require('ejs');
  const bodyParser = require("body-parser");
  const fileUpload = require('express-fileupload');
  const cloudinary = require('cloudinary').v2;
  const dotenv = require('dotenv');
  const authRouter = require("./routes/authRoutes");
  const flash = require("connect-flash");
  const User = require("./models/User")
  const passport = require("passport");
  var LocalStrategy = require('passport-local');
  const mongoose = require("mongoose");
  const session = require("express-session")
  const dbUrl = process.env.DB_URI


//Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/shopping-app", { useNewUrlParser: true,useUnifiedTopology: true })
.then(()=> console.log(" DB CONNECTED!"))
.catch((err)=> console.log(err));

const sessionSecret = 'this is a secret session'

const sessionflash = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {

    httpOnly:true,
    expires: Date.now()  + 7 *24*60*60*1000
  }
};

app.use(session(sessionflash))
app.use(flash());
app.use(passport.authenticate('session'));



app.use((req, res, next) => {

  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();

});








// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // so you can render('index')
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(fileUpload({useTempFiles:true}));
dotenv.config();
//passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);
console.log(process.env.CLOUD_NAME);

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
  });


const PORT = 3000;


app.get('/', (req, res) => {
    res.render("index");
});


const admin = {
    id : "#rishabh-441",
    name : "Rishabh Tiwari",
    mobile_no : "9354013292",
    created_on : "10 July 2023",
    email_id : "rishabhworld9145@gmail.com",
    profile_pic : ""
};

app.get('/admin', (req, res) => {
    res.render(__dirname + '/views/products/admin.ejs', {admin});
});

app.get('/admin/update', (req, res) => {
        res.render(__dirname +'/views/products/update_profile.ejs', {admin});
});
app.get('/admin/upload', (req, res) => {
        res.render(__dirname +'/views/products/upload.ejs');
});
app.get('/admin/manage', (req, res) => {
        res.render(__dirname +'/views/products/manage.ejs');
});


app.post('/admin/update', (req, res) => {
    const updated_admin =(req.body);
    const {profile_pic} = req.files;
    console.log(profile_pic);
    const title = req.body.title;
    profile_pic.name = Date.now() + profile_pic.name;

    cloudinary.uploader.upload(profile_pic.tempFilePath, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Error uploading image to Cloudinary');
        }
        console.log(result);
        // The uploaded image URL
        const imageUrl = result.secure_url;
    
        // Perform any necessary actions with the imageUrl and other form data
        admin.profile_pic = imageUrl;
        admin.name = updated_admin.fname + " "+ updated_admin.lname;
        admin.email_id = updated_admin.email_id;
        admin.mobile_no = updated_admin.mobile_no;

        console.log(admin);
    
        // Respond with the uploaded image URL
        // res.send(imageUrl);
      });
    // console.log(updated_admin.email_id);
    res.redirect('/admin');
})

//Routers

app.use(authRouter);


app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});
