// Fetch data from MongoDB
const schemas = require('./mongoSchemas');

module.exports =
    class FetchController {

        getHosts() {
            return new Promise((resolve, reject) => {
                schemas.hostMdl.find( (err, hosts) => {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    resolve(hosts);

                });
            });

        }

        getHostData(hostId = '5ebc2a530d0ffd1c6e5e8a05') {
           return Promise.all([this.getZFSList(),this.getZpool(),this.getSysProcs()]);
        }

        getSysProcs(hostId = '5ebfbfba062e17088cd76417') {
            return new Promise((resolve, reject) => {
                schemas.sysProcsMdl.where({hostId}).findOne((err, sys_proc_list) => {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    if (sys_proc_list) {
                        resolve(sys_proc_list);
                    }
                })
            });
        }

        getZpool(hostId = '5ebc2a530d0ffd1c6e5e8a05') {
            return new Promise((resolve, reject) => {
                schemas.zfspoolMdl.where({hostId}).findOne((err, zpool) => {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    if (zpool) {
                        resolve(zpool);
                    }
                })
            });

        }

        getZFSList(hostId = '5ebc2a530d0ffd1c6e5e8a05') {
            console.log('Invoked')
            return new Promise((resolve, reject) => {
                schemas.zfsMdl.where({hostId}).findOne((err, zfslistdata) => {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    if (zfslistdata) {
                        console.log('Resolved zfslist');
                        resolve(zfslistdata);
                    }
                })
            });

        }
    };