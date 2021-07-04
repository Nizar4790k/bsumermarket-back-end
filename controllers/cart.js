const addProduct = async (req,res,database)=>{
    
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

module.exports = {
    addProduct: addProduct,
    removeProduct:removeProduct
};
