const {mongoose} = require('./../server/db/mongoose.js');
const {todo} = require('./../server/models/todo.js');

var id = "594beaa5475c1a2c01cda280";

todo.find({_id: id})
    .then((todo)=>{
        console.log('todo: ', todo);
    })
    .catch((err)=>{
        console.log('error: ', err);
    })