const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mongodeveloper:FrTAJDp4Ld2A3N7w@cluster0.2tju3.mongodb.net/myproject?retryWrites=true&w=majority",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:false,
    forceServerObjectId:true,
    //TopologyDescription:false
})
.then(() =>{
    console.log("Successfully Connect...");
})
.catch((err) =>{
    console.log(err);
})