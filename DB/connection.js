const mongodb=require('mongoose');
url='mongodb+srv://bruce:skintobone@cluster0-s7uev.mongodb.net/Ishop?retryWrites=true&w=majority';

const connectDB= async()=>{
    await mongodb.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true,useUnifiedTopology: true});
    console.log('db connected...!');
}

module.exports=connectDB;
