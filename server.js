const express=require('express'),
      mongoose=require('mongoose'),
      cors=require('cors'),
      bodyParser=require('body-parser'),
      app=express();

//CORS AND BODYPARSER
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));   //parse the url encoded bodies
app.use(cors());    

//SERVER CONFIG
const port=process.env.PORT||5000;
 
 app.listen(port, () => {
     console.log(`server listening on port ${port}`);
 });
