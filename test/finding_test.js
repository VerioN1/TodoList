const assert = require('assert')
const todoList = require('../routes/models/todoScehme')

describe('finding records', function(done){

    var item;

    beforeEach(function(done){
        item = new todoList({
            action: 'i need to drink orange',
            done: false
        });
        item.save().then(function(){
            assert(item.isNew === false);
            done();
        });

    });

    it('find one record from the database', function(done){

        todoList.findOne({action:'i need to drink orange'}).then(function(result){
            assert(result._id.toString() === item._id.toString())
            done();
            console.log(result)
        })
    })

})