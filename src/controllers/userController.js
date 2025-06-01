const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registration user controller
const registration = async(req, res) =>{
    try{
        const{name, email, phone, password} = req.body;

        console.log("BODY:", req.body);

        // simple validation
        if(!name || !email || !phone || !password){
            return res.status(400).json({message: "all field are required"})
        }
        // check if the user are already exist
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: "user already exist"})
        }
        // hassed password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create new user
        const newUser = new User ({
            name, 
            email,
             phone,
            password: hashedPassword,  
        });
        await newUser.save();
        res.status(200).json({message: "user created succesfully", user: newUser});
    } catch (error){
        console.error("registration error: ", error.message)
        return res.status(500).json({message: "server error"});
    }
};
// login user controller
 const login = async(req, res) =>{
    try{
        const{ email, password} = req.body;
        if(!email || !password){
           return res.status(400).json({message: "email and password  are required"});
        }
        const user = await User.findOne({email});
        if(!user){
           return res.status(401).json({message:"invalid credential"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "invalid credential"})
        }
// create jwt token

const token = jwt.sign(
    {userId: user._id},
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
);
        res.status(200).json({
            message: "login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.error("login error:", error.message);
        res.status(500).json({message: "server error"})
    }
 };

module.exports = {registration, login};
