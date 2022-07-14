const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'] // Match existing e-mail.
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    
});



userSchema.pre('save', async function(next) {
    // console.log(this.isModified('password',this))
    if (this.isnew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    try {
    // console.log(this.isModified('password','this',this))
        if(!this._update.$set.password){
            next()
        }
        const saltRounds = 10;

        this._update.$set.password = await bcrypt.hash(this._update.$set.password, saltRounds);
        next()
    } catch (err) {
        return next(err)
    }
});

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;