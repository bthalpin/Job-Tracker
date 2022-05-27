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
    Notes: {
        type: String
    },
    link: {
        type: String
    },
    applied: {
        type: Boolean
    },
    offer: {
        type: Boolean
    },
    rejected: {
        type: Boolean
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
    
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;