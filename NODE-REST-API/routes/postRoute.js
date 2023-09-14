const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const router = require('express').Router();



// get timeline posts
router.get('/timeline/:userId',async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: user._id});
        const friendsPosts = await Promise.all(
            user.followings.map((friendsId)=>{
                return Post.find({userId: friendsId})
            })
        )
        res.json(userPosts.concat(...friendsPosts))
    }
    catch(err){
        res.status(500).json(err)
    }
})

// create post
router.post('/',async (req,res)=>{
    try{
        const newPost = await new Post({
            userId: req.body.userId,
            description: req.body.description,
            img:req.body.img
        });
        await newPost.save();
        res.status(200).json(newPost)
    }
    catch (err){
        res.status(500).json(err)
    }
});

// update post
router.put('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json('Post updated successfully')
        }
        else{
            return res.status(403).json('You can update only your posts')
        }
    }    
    catch(err){
        res.status(500).json(err);
    }
});

// delete post
router.delete('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json('post detelted successfully')
        }
        else{
            return res.status(403).json('You can delete only your post')
        }
    }
    catch(err){
        res.status(500).json(err);
    }

});

// get post by post id
router.get('/:id', async (req,res)=>{
    try{
        const user = await Post.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// get post in a profile using username
router.get('/profile/:username', async (req,res)=>{
    
    try{
        const user = await User.findOne({username: req.params.username});
        const post = await Post.find({userId:user._id});
        res.status(200).json(post);
    }
    catch (err){
        res.status(500).json(err);
    }
})



// like/dislike
router.put('/:id/like', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json('Liked post')
        }
        else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json('disliked post')
        }

    }
    catch (err){
        res.status(500).json(err)
    }
});

router.get('/', (req,res)=>{
    res.send('I am the post get request')
})


module.exports = router;