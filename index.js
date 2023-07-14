var express = require('express'),
  engine = require('ejs-mate'),
  app = express();
  const path = require('path');
  const ejs = require('ejs');
  const bodyParser = require("body-parser");

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // so you can render('index')
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const PORT = 3000;


app.get('/', (req, res) => {
    res.render(__dirname + '/views/products/index.ejs');
});


const admin = {
    id : "#rishabh-441",
    name : "Rishabh Tiwari",
    mobile_no : "+91 9354013292",
    created_on : "10 July 2023",
    email_id : "rishabhworld9145@gmail.com"
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
    // let obj = JSON.parse(updated_admin)
    admin.name = updated_admin.fname + " "+ updated_admin.lname;
    admin.email_id = updated_admin.email_id;
    admin.mobile_no = updated_admin.mobile_no;
    // console.log(updated_admin.email_id);
    res.redirect('/admin');
})

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});