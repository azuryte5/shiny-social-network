const {Thought, User} = require('../../models');
const router = require('express').Router();
//get all thoughts
router.get('/', (req,res) =>{
    Thought.find({})
    .populate({
        path: 'user',
        select: '-__v'
    })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
})
// get a single thought
router.get('/:id', (req,res) =>{
    Thought.findOne({_id: req.params.id})
    .populate({
        path: 'user',
        select: '-__v'
    })
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
router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: params.id }, 
        req.body,
        {runValidators: true }
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
    res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
})
// delete/destroy a thought by id
router.delete('/:id', (req,res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this ID!'})
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
})
    // thoughts/:thoughtId/reactions to post
router.post('/:thoughtId/reactions', (req,res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No Thought found with this id!" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
})
 // thoughts/:thoughtId/reactions to delete
router.delete('/:thoughtId/:reactionId',(req,res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
})

module.exports=router;