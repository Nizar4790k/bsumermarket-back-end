const addProduct = async (req,res,database)=>{
    
    const{userId,product} = req.body;
    product.bougth=false;

    if(!product && !userId){
        return res.status(400).json({status:"EMPTY_BODY"});
    }

    const { MongoClient, url, dbName } = database;
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    try{
        const db = client.db(dbName);
        let collection = db.collection("cart");
    
        var isFound =  await checkUser(userId,collection)
        let result= null;
       
        if(isFound){
            result = await collection.update({userId:userId},{$push:{products:product}})
            
        }else{
            result = collection.insertOne({userId:userId,products:[product]});
    
        }
    
        return res.json({status:"ADDED_TO_CAR"});
    
    }catch(err){
        console.log(err);
    }
 
}

const removeProduct = async (req,res,database)=>{
    const{userId,product} = req.body;
    
    if(!product && !userId){
        return res.status(400).json({status:"EMPTY_BODY"});
    }

    const { MongoClient, url, dbName } = database;
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

        try{
            const db = client.db(dbName);
            let collection = db.collection("cart");
        
            var isFound =  await checkUser(userId,collection)
            let result= null;
            
            if(isFound){
                result = await collection.update({userId:userId},{$pull:{"products":{_id:product._id}}});
                
                return res.json({status:"REMOVED_FROM_CART"});
            }
            
        
        }catch(err){
            console.log(err);
            return res.json({status:"ERROR_WHEN_REMOVING_CART"})
        }

    
    
}




const getProducts= async (userId,database)=>{

    if(!userId){
        return res.status(400).json({status:"EMPTY_BODY"});
    }

    const { MongoClient, url, dbName } = database;
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

        try{
            const db = client.db(dbName);
            let collection = db.collection("cart");
        
            var isFound =  await checkUser(userId,collection)
            let result= null;
            
            if(isFound){
                result = await collection.find({userId:userId});
                
                const cart = await result.toArray();
 
                
                const products = cart[0].products;

                
                
                return products;
                
            }else{
                return [];
            }
            
        
        }catch(err){
            console.log(err);
            return res.json({status:"ERROR_WHEN_CHECKING CART"})
        }

}


const checkProduct=  async (req,res,database)=>{
    const{userId,product} = req.body;
    
    const id = product._id;

    if(!product && !userId){
        return res.status(400).json({status:"EMPTY_BODY"});
    }

    
    
        try{
             
            
                const productArray = await getProducts(userId,database);

                const productsFiltered = productArray.filter(function(product){
                    return product._id===id;
                })
                
              

                if(productsFiltered[0]){
                    return res.json({isInCart:true});

                }else{
                    return res.json({isInCart:false});
                }
                
                
            
            
        
        }catch(err){
            console.log(err);
            return res.json({status:"ERROR_WHEN_CHECKING CART"})
        }

}

async function checkUser(userId, collection) {

    try {
        let query = { userId: userId};
        let result = await collection.findOne(query);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }

}


const setBougth = async (req,res,database)=>{
    _id = req.body._id;
    userId = req.body.userId;
    bougth = req.body.bougth;



    if(!userId && !_id && !bougth){
        return res.status(400).json({status:"WRONG_BODY"});
    }

    const { MongoClient, url, dbName } = database;
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

        try{
            const db = client.db(dbName);
            let collection = db.collection("cart");
        
            var isFound =  await checkUser(userId,collection)
            let result= null;
            
            if(isFound){
                result = await collection.update({userId:userId,"products._id":_id},{$set:{"products.$.bougth":bougth}});
                
               return res.json({status:"PRODUCT_UPDATED"});
                
            }else{
                return res.json({status:"USER_NOT_FOUND"});
            }
        
        }catch(err){
            console.log(err);
            return res.json({status:"ERROR_WHEN_CHECKING CART"})
        }


}

const deleteAllProducts = async (req,res,database)=>{

    
    userId = req.body.userId;
  

    if(!userId){
        return res.status(400).json({status:"WRONG_BODY"});
    }

    const { MongoClient, url, dbName } = database;
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

        try{
            const db = client.db(dbName);
            let collection = db.collection("cart");
        
            var isFound =  await checkUser(userId,collection)
            let result= null;
            
            if(isFound){
                result = await collection.update({userId:userId},{$set:{products:[]}});
                
               return res.json({status:"ALL_PRODUCTS_DELETED_FROM_CART"});
                
            }else{
                return res.json({status:"USER_NOT_FOUND"});
            }
        
        }catch(err){
            console.log(err);
            return res.json({status:"ERROR_WHEN_CHECKING CART"})
        }

}


module.exports = {
    addProduct: addProduct,
    removeProduct:removeProduct,
    checkProduct:checkProduct,
    getProducts:getProducts,
    setBougth:setBougth,
    deleteAllProducts:deleteAllProducts
};
