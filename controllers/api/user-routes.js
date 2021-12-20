const User = require('../../models/User');

const router = require('express').Router();

router.get('/', (req,res) =>{
    User.find({})
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
})

//Still have to populate that users thought and friend data
router.get('/:id', (req,res) =>{
    User.findOne({_id: req.params.id})
    .then(dbUserData => {
    if (!dbUserData) { res.status(404).json({message: "No user found by this Id"})
    return;
    }
    res.json(dbUserData);
    })
    .catch( err => res.status(400).json(err));
})


router.post('/', (req, res) => {
    User.create(req.body)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
})

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate({ _id:req.params.id}, req.body, {new: true, runValidators: true})
    .then(dbUserData => {
        if (!dbUserData) { res.status(404).json({message: "No user found by this Id"})
        return;
    }
    res.json(dbUserData);
    })
    .catch( err => res.status(400).json(err));
})

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