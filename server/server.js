console.log('starting server.js');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

var app = express();
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
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})

module.exports = {app};