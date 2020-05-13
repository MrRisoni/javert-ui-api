const mongoose = require('mongoose');

var hostSchema = new mongoose.Schema({
    hostname     : { type : String , unique : true, required : true },
    description : { type:  String  },
    fileSys     : { type : String , required : true },
});


module.exports = {
    hostSchema
}

