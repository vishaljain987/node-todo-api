//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//var obj = new ObjectID();
//console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to  MongoDB server');
    
    
//    db.collection('Todos').deleteMany({text: 'Something to do1'})
//        .then((result)=>{
//            console.log(result);
//        })
//        .catch((err)=>{
//        console.log('Unable to delete tods', err);
//    })
    
    
//        db.collection('Todos').deleteOne({text: 'Something to do1'})
//        .then((result)=>{
//            console.log(result);
//        })
//        .catch((err)=>{
//        console.log('Unable to delete tods', err);
//    })
    
     db.collection('Todos').findOneAndDelete({text: 'Something to do1'})
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
        console.log('Unable to delete tods', err);
    })
    db.close();
})