const router =  require('express').Router();
const User = require('../models/usersModel.js');
const bcrypt = require('bcrypt');



// update user
router.put('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id || req.user?.isAdmin){
        if(req.body.password){
            try{
                const saltNumber = 10;
                const salt =  await bcrypt.genSalt(saltNumber);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.body.userId,{
                $set: req.body
            });
            res.status(200).json('Account has been updated!');
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json('You can update only your account');
    }
})

// delete user
router.delete('/:id', async (req,res)=>{    
    if(req.body.userId === req.params.id || req.user?.isAdmin){
        try{
            await User.findOneAndDelete({_id:req.params.id});
            // await User.findByIdAndDelete({id:ObjectId(req.params.id)})
            //await User.deleteOne(req.params.id);
            res.status(200).json('the user is delelted');
            
        }
        catch(err){
            console.log(err);
            res.status(403).json(err);
        }
        
    }
    else{
        return res.status(500).json('You can deltete only your account')
    }

});

// //==============================================================================
// // We can write the combined code in a single query
// // find user
// router.get('/:id', async (req,res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         res.status(200).json(user);

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// });

// // find user by username
// router.get('/:username', async (req,res)=>{
//     try{
//         const user = await User.findOne({username:req.params.username})
//         res.status(200).json(user);
//     }
//     catch(err){
//         return res.status(500).json(err);
//     }

// })
// --------------------------------------------------------------------------------
// combined code implemented by a single query
// get user
//---------------------------------------------------------------------------------

router.get('/', async (req,res)=>{
    const username = req.query.username;
    const userId = req.query.userId;

    try{
        const user = userId
        ?await User.findById(userId)
        :await User.findOne({username:username})
        res.status(200).send(user);
    }
    catch(err){
        return res.status(500).json(err)
    }
    
})
// //==============================================================================

// get friends

router.get('/friends/:userid', async (req,res)=>{
    try{
        // find user by id provided in params
        const user = await User.findById(req.params.userid);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        const friendsList = [];
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend;
            friendsList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendsList)

    }
    catch (err){
        return res.status(500).json(err)
    }
})



// follow
router.put('/:id/follow', async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const currentUser = await User.findById(req.params.id);
            const userToFollow = await User.findById(req.body.userId)

            if(!currentUser.followers.includes(req.body.userId)){
                await currentUser.updateOne({$push: {followers: req.body.userId}});
                await userToFollow.updateOne({$push:{followings: req.params.id}});

                res.status(200).json("user has been followed");
            }
            else{
                res.status(403).json('you already following');
            }
        }
        catch(err){
            res.status(500).json(err);

        }
    }
    
    else{
        return res.status(500).json("You can't follow yourself")
    }

});


// unfollow
router.put('/:id/unfollow', async (req,res)=>{
    if(req.body.userId !== req.params.id){
        const currentUser = await User.findById(req.params.id);
        const userToUnfollow = await User.findById(req.body.userId);

        try{
            if(currentUser.followers.includes(req.body.userId)){
                await currentUser.updateOne({$pull: {followers:req.body.userId}});
                await userToUnfollow.updateOne({$pull:{followings: req.params.id}});
                res.status(200).json('User being successfully unfollowed');
            }
            else{
                return res.status(403).json('You are not following the user')
            }
        }
        catch(err){
            res.status(403).json(err);
        }
        
    }
    else{
        return res.status(500).json('You cannot unfollow yourself')
    }

});


module.exports = router;