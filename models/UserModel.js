const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    
    firstname :{ 
        type: String, 
        required: [true, 'First name is required'], 
        trim: true,
    },
    lastname :{ 
        type: String, 
        required: [true, 'Last name is required'], 
        trim: true, 
    },
    email :{ 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password :{ 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    phonenumber :{ 
        type: String, 
        required: [true, 'Phone number is required'],
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
    },
    role :{ 
        type: String, 
        enum: ['user', 'admin','pharmacy'], 
        default: 'customer' 
    },
    createdAt :{ 
        type: Date, 
        default :  Date.now
    },
})


UserSchema.pre('save', async function (next) {
 
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);  
    }
});


const User = mongoose.model('User', UserSchema)

module.exports = User;