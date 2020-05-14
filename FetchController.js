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
           return Promise.all([this.getZFSList()]);
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