const assert = require('assert')
const todoList = require('../routes/models/todoScehme')

describe('Saving Records', function(){

    it('insert todo Action', function(done){

        var item = new todoList({
            action: 'i need to drink orange',
            done: false
        });
        item.save().then(function(){
            assert(item.isNew === false);
            done();
        });

    })

})