const {Thought, User} = require('../../models');
const router = require('express').Router();
//get all thoughts
router.get('/', (req,res) =>{
    Thought.find({})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
})
// get a single thought
router.get('/:id', (req,res) =>{
    Thought.findOne({_id: req.params.id})
    .select('-__v')
    .then(dbThoughtData => {
    if (!dbThoughtData) { res.status(404).json({message: "No Though found by this Id"})
    return;
    }
    res.json(dbThoughtData);
    })
    .catch( err => res.status(400).json(err));
})
// post a new thought. dont' forget to push that users id
router.post('/:id', (req, res) => {
    Thought.create(req.body)
    .then(({_id}) => {
    return User.findOneAndUpdate(
        { _id: params.UserId },
        { $push: {thoughts: _id} },
        { new: true }
    );
    })
    .then((dbUserData) => {
        if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id!" });
        return;
        } 
    res.json(dbUserData)
    })
    .catch(err => res.status(400).json(err));
})
//put/update a thought by id

// delete/destroy a thought by id

    // thoughts/:thoughtId/reactions
    // Post create a reaction to a single thought array
    // Delete to pull and remove a reaction by reaction id value
module.exports=router;