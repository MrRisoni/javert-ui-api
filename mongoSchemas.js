const mongoose = require('mongoose');

var hostSchema = new mongoose.Schema({
    hostname: {type: String, unique: true, required: true},
    description: {type: String},
    fileSys: {type: String, required: true},
});





var zfsListItemSchema = new mongoose.Schema({
    name: String,
    sizeRaw:String,
    sizeMib:Number,
    usedRaw: String,
    usedMib: Number,
    used:{type: Number, default: 0.000001},
    availRaw: String,
    availMib: Number,
    mounted: String
});


var zfsListSchema = new mongoose.Schema({
    hostId: {type: String, unique: true, required: true},
    stamp: {type: Date, default: Date.now},
    items: [zfsListItemSchema],
});

// eg free memory below < 35%
// eg zfsroot used above 50%


var zfsMdl = mongoose.model('ZFSList', zfsListSchema);
var hostMdl = mongoose.model('Host', hostSchema);


module.exports = {
    hostSchema,
    zfsListSchema,
    zfsListItemSchema,
    zfsMdl,
    hostMdl
}
