//import json webtoken
const jwt = require("jsonwebtoken");

//importing jwtsecret from .env for jwt session solution.
const dotenv = require("dotenv");
dotenv.config();


module.exports = function(req,res,next) {
    //Get token from header
    const token = req.header('x-auth-token')

    //Check if token does not exists
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret)
        req.user = decoded.user;
        next()
    } 
    catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}