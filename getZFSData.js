const axios = require("axios");

require("custom-env").env("staging");
const mongoose = require("mongoose");
const schemas = require("./mongoSchemas");


const connStr =
    "mongodb+srv://" +
    process.env.MONGO_USR +
    ":" +
    process.env.MONGO_PASSWD +
    "@" +
    process.env.MONGO_HOST +
    "/" +
    process.env.MONGO_DBNAME +
    "?retryWrites=true&w=majority";

mongoose.connect(connStr, {useNewUrlParser: true, useUnifiedTopology: true});

var zfsMdlItm = mongoose.model("ZFSListItem", schemas.zfsListItemSchema);
var zfsMdl = mongoose.model("ZFSList", schemas.zfsListSchema);

axios
    .get("http://192.168.122.107:8080/zfslist")
    .then(function (response) {
        //  console.log(response.data);
        var hostname = response.data.hostName;
        var partitions = [];
        response.data.partitions.forEach(prt => {
            var sizeMib = usedMib =availMib = used =0;

            
            let usedUnit = prt.used.replace(/[^a-zA-Z]+/g, '');
            let sizeUnit = prt.size.replace(/[^a-zA-Z]+/g, '');
            let availUnit = prt.avail.replace(/[^a-zA-Z]+/g, '');

            let usedRaw = prt.used.replace(/\D+/g, '');


            console.log(usedUnit + ' ' + sizeUnit + ' ' + availUnit);
            console.log(usedRaw + ' ' + sizeUnit + ' ' + availUnit);

            // convert to Mib


            partitions.push(
                new zfsMdlItm({
                    name: prt.fileSystem,
                    usedRaw: prt.used,
                    sizeRaw: prt.size,
                    availRaw: prt.avail,
                    mounted: prt.mounted
                })
            );
        });

        var zfsTank = new zfsMdl({
            hostId: response.data.hostName,
            items: partitions
        });
        zfsTank.save().then(() => console.log("meow"));
    }).catch(function (error) {
    // handle error
    console.log(error);
});
