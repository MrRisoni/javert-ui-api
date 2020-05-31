// Save data to MongoDB

const schemas = require('./mongoSchemas');
const axios = require('axios')

module.exports =
    class PutController {

        zpool(url) {

            axios
                .get("http://192.168.122.107:8080/zpool")
                .then(function (response) {
                    console.log(response.data);
                    var hostname = response.data.hostName;
                    var pools = [];
                    response.data.pool.forEach(pl => {
                        pools.push(
                            new schemas.zfspoolItmMdl({
                                disk: pl.disk,
                                state: pl.state,

                            })
                        );
                    });

                    var pisina = new schemas.zfspoolMdl({
                        hostId: response.data.hostName,
                        disks: pools
                    });
                    pisina.save().then(() => console.log("meow"));
                })
                .catch(function (error) {
                    // handle error
                    console.log("Axios Zpool error");
                    console.log(error);
                });


        }

        sysProc(url) {
            const self = this;
            return new Promise((resolve, reject) => {

                var sysProcsMdl = schemas.sysProcsMdl
                var sysProcItemMdl = schemas.sysProcItemMdl;

                axios
                    .get(url + "/sysproc")
                    .then(function (response) {
                        var hostname = response.data.hostName;
                        var sysproclist = [];
                        response.data.sysproclist.forEach(proc => {

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
                        procs.save().then(() => resolve()).catch(mongoErr => reject());

                    }).catch(function (error) {
                    // handle error
                    console.log(error);
                    reject();
                });

            });
        }
    }