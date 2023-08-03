var express = require("express"),
  engine = require("ejs-mate"),
  app = express();
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const adminRouter = require('./routes/adminRoutes');
const blogPageRouter = require('./routes/blogPageRoutes');
const flash = require("connect-flash");
const User = require("./models/User");
const passport = require("passport");
var LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const session = require("express-session");
const dbUrl = process.env.DB_URI;
const { v4: uuidv4 } = require("uuid");

//Connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/Blogging-website", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" DB CONNECTED!"))
  .catch((err) => console.log(err));

const sessionSecret = "this is a secret session";

const sessionflash = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionflash));
app.use(flash());
app.use(passport.authenticate("session"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // so you can render('index')
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
dotenv.config();

//passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//cloudinary setup configurations
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

PORT = 3999;

app.get("/", (req, res) => {
  res.render("products/index.ejs");
});

//admin routes
app.use('/admin', adminRouter);

//blog page routes 
app.use('/blogs', blogPageRouter);

//authentication routes
app.use(authRouter);

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
