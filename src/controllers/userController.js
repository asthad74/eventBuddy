const User = require("../models/User");

// registration used controller
const registration = async(req, res) =>{
    try{
        const{name, email, phone} = req.body;

        console.log("BODY:", req.body);

        // simple validation
        if(!name || !email || !phone){
            return res.status(400).json({message: "all field are required"})
        }
        // check if the user are already exist
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: "user already exist"})
        }
        // create new user
        const newUser = new User ({name, email, phone});
        await newUser.save();
        res.status(200).json({message: "user created succesfully", user: newUser});
    } catch (error){
        console.error("registration error: ", error.message)
        return res.status(500).json({message: "server error"});
    }
};
module.exports = {registration};
