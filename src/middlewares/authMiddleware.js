const jwt = require("jsonwebtoken");
const authenticateuser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("bearer")){
        return res.status(401).json({
            message: "unauthorized: no token provided"
        })
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("token verification failed:", error.message );
        return res.status(401).json({message: "unauthorized valid token"})
    }
}
