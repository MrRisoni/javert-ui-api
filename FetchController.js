// Fetch data from MongoDB
const schemas = require('./mongoSchemas');

module.exports =
    class FetchController {

        getZFSList(hostId = '5ebc2a530d0ffd1c6e5e8a05') {
            return new Promise((resolve, reject) => {
                schemas.zfsMdl.where({hostId}).findOne(function (err, zfslistdata) {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    if (zfslistdata) {
                        resolve(zfslistdata);
                    }
                })
            });

        }
    };