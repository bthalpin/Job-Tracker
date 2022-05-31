const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    contactInfo: {
        type: String
    },
    notes: {
        type: String
    },
    link: {
        type: String
    },
    status:{
        type:String,
        enum:['created','applied','offer','rejected']
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;