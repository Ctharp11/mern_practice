const express = require('express');
const router = express.Router();
const Item = require('../models/Items');

router.get('/', (req, res) => {
    Item.find().then(item => res.json(item))
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    Item.findById( {_id: req.params.id} )
    .then(item => res.json(item))
    .catch(err => res.json(err))
});

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(400).json());
});

module.exports = router;