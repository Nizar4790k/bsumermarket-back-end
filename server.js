const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const register = require('./controllers/register');
const products = require('./controllers/products');
const login = require('./controllers/login');
const bcrypt= require('bcrypt');
const dotenv = require("dotenv");
dotenv.config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());





app.post

app.listen(process.env.PORT|| 3001,()=>{
    console.log(`Server running on port: ${process.env.PORT || 3001}`);
})



const db = {
    MongoClient: mongodb.MongoClient, 
    url:process.env.MONGODB_URI,// URL at which MongoDB service is running
    dbName:process.env.DB_NAME // A Client to MongoDB
}

app.post('/register', (req, res) => {
    
    register.handleRegister(req,res,db,bcrypt)
})

app.post('/login',(req,res)=>{
    login.handleLogin(req,res,db,bcrypt);
})

app.get('/products',(req,res)=>{
    products.getProducts(req,res,db);
})