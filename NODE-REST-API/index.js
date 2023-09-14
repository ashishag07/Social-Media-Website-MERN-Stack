const express = require('express');
const app = express();

const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

const cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/usersRoute');
const authRoute = require('./routes/authRoute.js');
const postRoute = require('./routes/postRoute');


dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, ()=> {
    console.log('Connected to MongoDB')
});

// middlewere use as body-parser
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
  }));
app.use(morgan('common'));

app.use('/images',express.static(path.join(__dirname,'public/images')));

// storage management to upload the file
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images')
    },
    filename: (req,file,cb)=>{
        console.log(`req.body.name: ${req.body.name}`)
        cb(null,req.body.name)
    }
});

// multer middleware to upload the file
const upload = multer({storage})
// console.log(upload)

app.get('/', (req,res)=>{
    res.send('I am homepage');
});

app.post('/api/upload',upload.single('file'), (req,res)=>{
    try{
        return res.status(200).json('File uploaded successfully.')

    }
    catch (err){
        console.log(err)
    }

});
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoute);

app.use('/api/posts', postRoute);






app.listen(8800, ()=>{
    console.log('The server is set and listning at port 8800.')
});

//a88TqrJZ5Ne2041g