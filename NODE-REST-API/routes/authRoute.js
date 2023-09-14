const router = require('express').Router();
const User = require('../models/usersModel.js');
const bcrypt = require('bcrypt');

// create new user
router.post('/register', async(req,res)=> {
    
    try{
        // generate hashed password
        const numberOfSalt = 10;
        const salt = await bcrypt.genSalt(numberOfSalt);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // create new user
        const user = new User({
        username:req.body.username,
        password: hashedPassword,
        email: req.body.email,
        description:req.body.description
        });

        // save new user
        const newUser = await user.save();
        res.status(200).json(newUser);
    }
    catch(err){
        console.log(err);
    }
});

// user login by email and password
router.post('/login', async (req,res) => {
    
    try{
        const user  = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).json('user not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json('wrong password');

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    };

});



router.get('/', (req,res)=>{
    res.send('I am auth route')
});


module.exports = router;