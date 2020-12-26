const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const MONGODB_URI = 'mongodb+srv://lilanka:fgReZdY1mrSUnALO@cluster0-czfs4.mongodb.net/takeaway?retryWrites=true&w=majority'

const restaurantRoutes = require('./routes/restaurant');

const app = express();

//To File,Upload, Download
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // current timestamp in milliseconds
    let ts = Date.now();

    let date_ob = new Date(ts);
    let min = date_ob.getMinutes();
    let hours = date_ob.getHours();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    cb(null, year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + file.originalname);
  }
});

//To filter the uploading images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

//To access request body
app.use(bodyParser.json());
//To register the multer
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));



// creat static image path
app.use("/images", express.static(path.join(__dirname, 'images')));

//To avoid CORS errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

//app.use('/restaurant', restaurantRoutes);


app.use('/admin', restaurantRoutes);

//register express error handeling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
});


//connect DB 'takeway'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    });