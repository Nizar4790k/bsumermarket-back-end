
const getProducts =async (req,res,database)=>{
    
    const  inputText = req.query.inputText;
    const criteria = req.query.criteria;
    


    const {MongoClient,url,dbName}= database;

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
    .catch(err=>{console.log(err);});


    try{

        if(!client){
            res.status(500).json({status:"ERROR IN THE SERVER"});
            return;
        }
       
        const db = client.db(dbName);
        
        let collection = db.collection("products");

        let query = null;

        if(!inputText || inputText===""){
           query = await collection.find({})
        }else if(criteria==="name"){
            query = await collection.find({name: {'$regex': inputText, '$options': 'i'}});
            
        }else{
            query = await collection.find({description :{'$regex': inputText, '$options': 'i'}});
        }
       

        let products = await query.toArray();
        

        
        if(products){
           return res.json(products)
        }else{
            return res.json({status:"NO_PRODUCTS"});
        }

    }catch(err){
        console.log(err)
    }


}

module.exports ={
    getProducts:getProducts
};