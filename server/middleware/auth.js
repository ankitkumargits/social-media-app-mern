import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try{
        let token = req.header("Authorization");

        if(!token){
            res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            ...verified,
            ankit: "ankit"
        };
        next();
    }catch(err){
        res.status(500).json({error: err.message});
    }
}