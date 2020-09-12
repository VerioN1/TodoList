const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    action:String,
    done: Boolean
});
// need to be todoitem!!!!!!!!!!!!!!!!!!!!! no todoList
const todoItem = mongoose.model('todoItem', itemSchema);

module.exports = todoItem;