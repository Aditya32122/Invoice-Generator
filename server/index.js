const express = require("express")
const mongoose=require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
// transport data from frontend to backend in json format 
const app = express()
app.use(express.json())
app.use(cors())

//create connection with mongodb go to mongodb compass capy the connection string 
mongoose.connect("mongodb://localhost:27017/employee");
//for login
app.post('/login',(req,res)=>{
    const {email,pass} = req.body;
    EmployeeModel.findOne({email})
    .then(user =>{
        if(user){
            if(user.pass ===pass){
                res.json("Success")
            }else{
                res.json(" password is incorrect ")
            }
        }else{
            res.json("No record existed")
        }
    })
    .catch(err=>res.json(err))
})
//for register
app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees =>res.json(employees))
    .catch(err=>res.json(err))
})
app.listen(3001,()=>{
    console.log('Server is running')
})