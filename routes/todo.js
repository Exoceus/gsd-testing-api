const path = require('path');
const url = require('url');

const router = require('express').Router();
let ToDo = require('../models/todo.model.js');

require('dotenv').config();

router.get('/all', (req, res) => {
    ToDo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/all/new', (req, res) => {
    ToDo.find().sort({ createdAt: -1 }).limit(50)
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});


//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/:id', (req, res) => {
    var id = req.params.id;
    ToDo.find({ _id: id })
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));
});


//PROFILE CREATION
router.post('/new', (req, res) => {
    var user_id = req.body.user_id;
    var title = req.body.title;
    var alloted_time = req.body.alloted_time;
    var alloted_break = req.body.alloted_break;
    var completed = req.body.completed;
    var description = req.body.description;
    var ongoing = req.body.ongoing;
    var time_left = req.body.alloted_time;

    const newTodo = new ToDo({ user_id: user_id, title: title, description: description, alloted_time: alloted_time, alloted_break: alloted_break, completed: completed, ongoing: ongoing, time_left: time_left });

    if (user_id == 'undefined' || !title == 'undefined' || !completed == 'undefined' || !ongoing == 'undefined') {
        return res.status(400).json({ msg: 'Please enter all fields!', newTodo })
    }

    newTodo.save()
        .then((todo) => res.json("ToDo Created"))
        .catch(err => {
            res.status(400).json('Error: ' + err)
            console.log('ERROR:' + err)
        });
});

router.post('/update/:id', (req, res) => {

    const id = req.params.id;

    ToDo.updateOne({ _id: id },
        {
            $set: {
                'title': req.body.title,
                'description': req.body.description,
                'alloted_time': req.body.alloted_time,
                'alloted_break': req.body.alloted_break,
                'completed': req.body.completed,
                'ongoing': req.body.ongoing
            }
        }
    ).then(() => res.json('Opp Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

});


//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/user/:id', (req, res) => {

    var user_id = req.params.id;

    ToDo.find({ user_id: user_id })
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));

});


router.delete('/del/:id', (req, res) => {

    var id = req.params.id;

    ToDo.remove({ _id: id }, { justOne: true })
        .then(() => res.json('Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;