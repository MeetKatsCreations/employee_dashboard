const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = process.env.SECRET_KEY


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("not valid email")
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
    about: {
        type: String,
        default: ""
    },
    contactNo: {
        type: String,
        // validate: {
        //     validator: function (v) {
        //         // Allow empty or valid 10-digit numbers
        //         return v === "" || /^[0-9]{10}$/.test(v);
        //     },
        //     message: (props) => `${props.value} is not a valid phone number!`
        // },
        default: ""
    },

    skills: {
        type: [String],
        default: []
    },
    department: {
        type: String,
        default: ""
    },
    teams: {
        type: [String],
        default: [],
    },
    title: {
        type: String,
        default: ""
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    profilePic: {
        type: [String],
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],

    verifytoken: {
        type: String,
    }
});






userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next()
});



userSchema.methods.generateAuthtoken = async function (req, res) {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}



module.exports = mongoose.model('users', userSchema)





