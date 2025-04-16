const users=require("../Models/userModel")
const loginUser = async (req, res) => {

}
const registerUser = async (req, res) => {
    const { name, email, password, cpassword,role } = req.body
    if (!name || !email || !password || !cpassword || !role) {
        res.status(422).json({ error: "fill all the fields" })
    }
    try {
        const preuser = await users.findOne({ email: email })
        if (preuser) {
            return res.status(422).json({ error: "This Email  already exists" });
        }
        else if (password !== cpassword) {
            res.status(422).json({ error: "password and confirm password does not matches" })
        }else if(password.length<6){
            res.status(422).json({ error: "password must be of length 6." })

        } else {
            const finalUser = new users({
                name, email, password, cpassword,role
            })
            const storeData = await finalUser.save();
            
            res.status(201).json({ status: 201,success: true,message:"user successfully registered", storeData })

        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error: " + err.message });
    }

}
module.exports = { loginUser, registerUser }