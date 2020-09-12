const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');



const uri = 'mongodb://127.0.0.1:27017/todoList';

mongoose.Promise = global.Promise;
mongoose.connect(uri);

before(function(done){
    mongoose.connection.once('open', function(){
        console.log('Connection has been made');
        done();
    }).on('error', function(error){
        console.log("connection error: ", error);
    })

})

beforeEach(function(done){
    mongoose.connection.collections.todolists.drop(function(){
        done();
    })
})

