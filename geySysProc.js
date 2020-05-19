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

var sysProcsMdl = schemas.sysProcsMdl
var sysProcItemMdl = schemas.sysProcItemMdl;

axios
    .get("http://localhost:8080/sysproc")
    .then(function (response) {
        //  console.log(response.data);
        var hostname = response.data.hostName;
        var sysproclist = [];
        response.data.sysproclist.forEach(proc => {

            if (proc.command.indexOf('java') > -1) {
                console.log(proc);
            }
            sysproclist.push(
                new sysProcItemMdl({
                    pid: proc.pid,
                    user: proc.used,
                    cpu: proc.cpu,
                    memory: proc.mem,
                    command: proc.command
                })
            );
        });

        var procs = new sysProcsMdl({
            hostId: response.data.hostName,
            processes: sysproclist
        });
        procs.save().then(() => console.log("meow"));
    }).catch(function (error) {
    // handle error
    console.log(error);
});
