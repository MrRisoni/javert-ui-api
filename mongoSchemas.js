const mongoose = require('mongoose');

var hostSchema = new mongoose.Schema({
    hostname: {type: String, unique: true, required: true},
    description: {type: String},
    fileSys: {type: String, required: true},
});


var zfsListStatusItemSchema = new mongoose.Schema({
    name: String,
    state:String,
    read:Number,
    write: Number,
    cheksum: Number
});


var zfsStatusSchema = new mongoose.Schema({
    hostId: {type: String, required: true},
    stamp: {type: Date, default: Date.now},
    items: [zfsListStatusItemSchema],
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
    hostId: {type: String, required: true},
    stamp: {type: Date, default: Date.now},
    items: [zfsListItemSchema],
});

// eg free memory below < 35%
// eg zfsroot used above 50%


var sysProcSchema = new mongoose.Schema({
    pid: String,
    user:  String,
    cpu:  Number,
    memory: Number,
    command:  String,

});


var sysProcListSchema = new mongoose.Schema({
    hostId: {type: String, required: true},
    stamp: {type: Date, default: Date.now},
    processes: [sysProcSchema],
});


var zfsMdl = mongoose.model('ZFSList', zfsListSchema);
var hostMdl = mongoose.model('Host', hostSchema);
var sysProcsMdl = mongoose.model('sysproc', sysProcListSchema);
var sysProcItemMdl = mongoose.model('sysprocitm', sysProcSchema);


module.exports = {
    hostSchema,
    zfsListSchema,
    zfsListItemSchema,
    zfsMdl,
    hostMdl,
    zfsStatusSchema,
    sysProcSchema,
    sysProcListSchema,
    sysProcsMdl,
    sysProcItemMdl
}
