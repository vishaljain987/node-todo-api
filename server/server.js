console.log('starting server.js');

require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo_item = new todo({
        text: req.body.text
    });
    todo_item.save()
    .then((doc)=>{
        console.log(doc)
        res.send(doc);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res)=>{
    todo.find()
    .then((todos)=>{
        res.send({todos});
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
});

app.get('/todos/:id', (req, res)=>{
    var _id = req.params.id
    if(!ObjectID.isValid(_id)){
        return res.status(404).send();
    }
    todo.find({_id})
    .then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.send({todo});
    })
    .catch((err)=>{
        res.status(400).send({err, todo:[]})
    })
});

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

module.exports = {app};