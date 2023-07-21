var express = require('express'),
  engine = require('ejs-mate'),
  app = express();
  const path = require('path');
  const ejs = require('ejs');
  const bodyParser = require("body-parser");
  const fileUpload = require('express-fileupload');
  const cloudinary = require('cloudinary').v2;
  const dotenv = require('dotenv');



// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // so you can render('index')
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(fileUpload({useTempFiles:true}));
dotenv.config();

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
    res.render(__dirname + '/views/products/index.ejs');
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

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});

