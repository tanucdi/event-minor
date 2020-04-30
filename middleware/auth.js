const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");
dotenv.config();

function auth(req,res,next){
    
    const token=req.header('jwt-token');
    console.log(token);
    if(!token) return res.status(401).json({msg:"No token authorization needed"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        return next();
    }catch(e){
        res.status(400).json({msg:'Token is not valid'})
    }
}
module.exports=auth;