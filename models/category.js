var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({ 
    title: {
        type:String,
        required:true,
    },

      slug:String, 


})
module.exports=mongoose.model('category',categorySchema);