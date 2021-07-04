const handleLogin = async function(req,res,database,bcrypt){

    
    const {email,password} = req.body;

    const user = {email:email,password:password}
    const {MongoClient,url,dbName}= database;
    
    

    if(!user.email || !user.password){
        return res.json({status:"ACCESS_DENIED"});
    }

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
                    .catch(err=>{console.log(err);});

    try{

        if(!client){
            res.status(500).json({status:"ERROR IN THE SERVER"})
            return;
            
        }

    const db = client.db(dbName);
    let collection = db.collection("users");

    let result  = await collection.findOne({email:email});

    if(!result){
        res.json({status:"ACCESS_DENIED"});
        return;
        
    }

    let value = bcrypt.compareSync(user.password,result.password);

    if(value){
       
        res.json({status:"ACCESS_GRANTED",user:{fullName:result.fullName,id:result._id}})
        
    }else{
        res.json({status:"ACCESS_DENIED"});
        
    }


    }catch(err){
        console.log(err)
        res.status(500).json("ERROR IN THE SERVER")
    }finally{
        client.close();
    }



}




module.exports ={
    handleLogin:handleLogin
};