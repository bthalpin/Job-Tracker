const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    logo: {
        type: String
    },
    jobs:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;