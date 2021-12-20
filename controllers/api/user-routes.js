const User = require('../../models/User');

const router = require('express').Router();
// Get/findall all users
router.get('/', (req,res) =>{
    User.find({})
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
})

// Get/find 1 user and populate that users thought and friend data

// post/create a new user
router.post('/', (req, res) => {
    User.create(req.body)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
})

// Put/update a user by id


// Delete to remove user
    // Bonus remove all of their thoughts as well
router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id:req.params.id})
    .then(dbUser => {
        if (!dbUser) { res.status(404).json({message: "No user found by this Id"})
    return;
    }
    res.json(dbUser);
    })
    .catch( err => res.status(400).json(err));
})

// userid/friends/friendID
    // Post/create a new friend to a user friend list
    // Delete remove a friend from a user friends list

    module.exports=router;