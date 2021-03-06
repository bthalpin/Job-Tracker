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
    resumeLink:{
        type: String
    },
    coverLetterLink: {
        type: String
    },
    status:{
        type:String,
        enum:['created','applied','offer','rejected','archived']
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
    
},
{   
    timestamps:true,
    toJSON:{
        virtuals:true
    }
});

jobSchema.virtual('date').get(function(){
    const newDate = new Date(this.createdAt);
    // let hour = newDate.getHours() ;
    // let timeOfDay;
    // if(hour>12){
    //   hour-=12
    //   timeOfDay = 'PM'
    // } else {
    //   timeOfDay = 'AM'
    // }
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;