const router = require('express').Router();
let User = require('../models/user.model.js');

require('dotenv').config();

router.get('/all', (req, res) => {
    User.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/:id', (req, res) => {
    var id = req.params.id;
    User.find({ _id: id })
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));
});


//PROFILE CREATION
router.post('/new', (req, res) => {
    var UID = req.body.UID;
    var name = req.body.name;
    var email = req.body.email;

    const newUser = new User({ UID: UID, name: name, email: email });

    newUser.save()
        .then((user) => res.json("ToDo Created"))
        .catch(err => {
            res.status(400).json('Error: ' + err)
            console.log('ERROR:' + err)
        });
});

router.post('/update/:id', (req, res) => {

    const id = req.params.id;

    User.updateOne({ _id: id },
        {
            $set: {
                'UID': req.body.title,
                'name': req.body.description,
                'email': req.body.alloted_time
            }
        }
    ).then(() => res.json('Opp Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/UID/:id', (req, res) => {

    const UID = req.params.id;

    User.findOne({ UID: UID })
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/del/:id', (req, res) => {

    var id = req.params.id;

    User.remove({ _id: id }, { justOne: true })
        .then(() => res.json('Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;