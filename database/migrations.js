const setMigrations = async (database)=>{

    let isCreated= false;

    const {MongoClient,url,dbName}= database;

    MongoClient.connect(url, function (err, db) {

        var dbo = db.db(dbName);
    
    
        dbo.createCollection("products", async function (err, res) {
            if (err) {
                if (err.code === 48) {
                    
                    console.log("Collection already exist")
                    isCreated=true;
                }
            } else {
               
                isCreated=false;
                
            }
           
    
        });
    
        db.close();
    })

    if(!isCreated){
        const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
        .catch(err=>{console.log(err);});

        try{
            if(!client){
                res.status(500).json({status:"ERROR IN THE SERVER"});
                return;
            }
           
            const db = client.db(dbName);
            
            let collection = db.collection("products");

            collection.insertMany([
                {
                    img: "https://fruterox.co/wp-content/uploads/2020/07/Manzana_roja.jpg",
                    name: "Manzana Roja",
                    description: "Manzana importada desde el extranjero, esta cuenta con una gran variedad de vitaminas",
                    hall: 1,
                    price: 3.0,
                    discount: 0.10
                },
                {
                    img: "https://pamsdailydish.com/wp-content/uploads/2015/04/Bunch-Bananas-2.jpg",
                    name: "Guineo Maduro",
                    description: "Fruta caribeña la cual tiene un alto contenido en potasio",
                    hall: 2,
                    price: 1.0,
                    discount: 0.05
                },
                {
                    img: "https://omecalli.com/wp-content/uploads/2016/04/STRAWBERRY.jpg",
                    name: "Fresa",
                    description: "La fresa es un fruto del fresal, una planta de la familia de las rosáceas. El dulce sabor, el intenso aroma y el brillante color rojizo de este fruto resultan irresistibles y, además, aporta valiosos nutrientes para nuestra salud.",
                    hall: 1,
                     price: 3.0,
                    discount: 0.10
                },
                {
                    img: "https://www.ilgiardinocommestibile.it/wp-content/uploads/2020/08/pera-pera.jpg",
                    name: "Pera",
                    description: "La pera es el fruto de un árbol que es llamado Peral, cuyo cultivo puede darse en verano o en invierno.La fruta está caracterizada por ser carnosa, tener una textura suave, por su pulpa blanca y su piel verde claro. Aunque hoy en día existen especies manipuladas con piel roja o de un color amarillo fuerte.",
                    hall: 1,
                    price: 1.5,
                    discount: 0.03
                },
                {
                    img: "https://2.bp.blogspot.com/-BICeJA-BUkQ/VdTx0aDUbFI/AAAAAAAALHA/3--NlPzDLaI/s1600/vegetales-frutas-panama-brocoli.jpg",
                    name: "Brocoli",
                    description: "El brócoli es una hortaliza con un gran valor nutritivo, pues aporta al organismo vitaminas (vitamina C, B1, B2, B3 y B6, pero sobre todo una gran cantidad de provitamina A, principalmente en forma de beta-carotenos), y minerales como el calcio, el potasio, el selenio, el fósforo, el magnesio y el hierro.",
                    hall: 2,
                    price: 2.25,
                    discount: 0.06
                },
                {
                    img: "https://admin.happyfruitla.cl/vistas/img/multimedia/zanahoria/Carrots.png",
                    name: "Zanahoria",
                    description: "La zanahoria es una hortaliza de consumo regular a nivel mundial. Se puede consumir de diversas formas, incluso crudas, y tanto su textura como su sabor, resultan muy agradables al paladar.",
                    hall: 2,
                    price: 2.50,
                    discount: 0
                },
                {
                    img: "http://navolarestaurant.com/wp-content/uploads/2018/02/CARNE-DE-RES-1080x675.jpg",
                    name: "Carne de res",
                    description: "Es una carne con un alto porcentaje de proteínas de alto valor biológico. En cuanto a las vitaminas y minerales, se encuentran en cantidades moderas. Es una fuente significativa de minerales tales como yodo, manganeso, zinc y selenio.",
                    hall: 3,
                    price: 6.0,
                    discount: 0.08
                }]);
    
        }catch(err){
            console.log(err);
        }

    }





}

module.exports = {
    setMigrations: setMigrations
};