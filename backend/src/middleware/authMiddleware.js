const jwt= require('jsonwebtoken')

exports.protect = async(req,res, next)=>{
    let token=req.headers.authorization;

    if(!token){
        res.status(401).json({
            message:'Unauthorized. Token is missing.'
        })
    }
    try{
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded.id;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message:'Invalid token...'
        })
    }
}