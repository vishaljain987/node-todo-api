const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {todo} = require('./../models/todo.js');

beforeEach((done)=>{
    todo.remove({text: "Inserting todo from testing framework"})
        .then(()=>{
        done();
    })
});

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = "Inserting todo from testing framework";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            
            todo.find({text})
            .then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            })
            .catch((err)=>{
                if(err){
                    return done(err);
                }
            })
        })
    });
    
    it('should not create todo with invalid body data', (done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err);
            }else{
                done()
            }
        })
        
//        todo.find()
//        .then((todos)=>{
//            expect(todos.length).toBe(0)
//            done()
//        })
//        .catch((err)=>{
//            return done(err);
//        })
    })
    
})

describe('GET /todos', ()=>{
    it('should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .end(done);
    })
})
