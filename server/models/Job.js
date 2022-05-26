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
    
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;