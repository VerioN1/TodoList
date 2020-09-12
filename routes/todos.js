const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const todoItem = require('./models/todoScehme');

router.get('/', (req, res , next) =>{
    todoItem.find().exec().then(docs =>{
        res.status(200).json(docs);
    }).catch(err =>{
        res.status(501).json({error: err})
    })
})

router.post('/', (req , res , next) =>{
    const item = new todoItem({
      action: req.body.action,
      done: req.body.done
    })
    item.save().then(result => {
        console.log(result)
    }).catch(err => console.log(err));
    res.status(201).json({
        response: 'Todo Item Added',
        todo : item
    })
})

router.get('/:todoId', (req, res , next)=> {
    const id = req.params.todoId;
    todoItem.findById(id).exec().then(doc => {
        console.log(doc)
        if(doc)
        res.status(200).json({doc})
        else res.status(404).json({message: "This Id Does Not Exsit"})
    }).catch(err =>{
        res.status(501).json({error: err})
    })
    }
)

router.delete("/:todoId", (req, res, next )=> {
    const id = req.params.todoId;
    todoItem.remove({_id: id}).exec().then(result =>{
        res.status(200).json(result);

    }).catch(err => {res.status(500).json({error: err})})
})

//get an array with propName : action , value : *content* and updates the ID you inserted

router.patch("/:todoId", (req, res, next) => {
    const id = req.params.todoId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] =ops.value;
    }
    todoItem.update({_id : id}, {$set: updateOps}).exec().then(result =>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;