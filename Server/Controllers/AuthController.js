const users=require("../Models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcryptjs");

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
            return res.status(422).json({ error: "password and confirm password does not matches" })
        }else if(password.length<6){
            return res.status(422).json({ error: "password must be of length 6." })

        } else {
            const finalUser = new users({
                name, email, password, cpassword,role
            })
            const storeData = await finalUser.save();
            
            return res.status(201).json({ status: 201,success: true,message:"user successfully registered", storeData })

        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error: " + err.message });
    }

}
const loginUser= async (req, res) => {
   

    const { email, password,role } = req.body;

    if (!email || !password || !role) {
        return res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await users.findOne({email:email,role:role});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                return res.status(422).json({ error: "invalid details"})
            }else{

                
                const token = await userValid.generateAuthtoken();
                 
                
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                return res.status(201).json({ status: 201,success: true,message:"user successfully LoggedIn", result:result })
            }
        }else{
            return res.status(500).json({success:false,message:"Email not registered with this role"})
        }

    } catch (error) {
        console.log(error);
       return  res.status(500).json({success: false,message:"Server Error" + error.message });

        
    }
};
const validUser=async(req,res)=>{
    try {
        const ValidUserOne = await users.findOne({_id:req.userId});
        res.status(200).json({ user: ValidUserOne });

    } catch (error) {
        res.status(401).json({status:401,error});
    }
  };
module.exports = { loginUser, registerUser,validUser }