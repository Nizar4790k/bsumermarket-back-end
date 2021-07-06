const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const register = require('./controllers/register');
const products = require('./controllers/products');
const login = require('./controllers/login');
const cart = require('./controllers/cart');
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
};

app.post('/register', (req, res) => {
    
    register.handleRegister(req,res,db,bcrypt)
});

app.post('/login',(req,res)=>{
    login.handleLogin(req,res,db,bcrypt);
});

app.get('/products',(req,res)=>{
    products.getProducts(req,res,db);
});

app.post('/cart',(req,res)=>{
    cart.addProduct(req,res,db)
})

app.delete('/cart/product',(req,res)=>{
    cart.removeProduct(req,res,db);
});

app.post('/checkproductcart',(req,res)=>{
    cart.checkProduct(req,res,db)
})

app.get('/cart/:id',async (req,res)=>{
    const userId = req.params['id'];
    
    const products = await cart.getProducts(userId,db)

     return res.json({products: products});

})

app.put('/cart/product',(req,res)=>{
     cart.setBougth(req,res,db);
})