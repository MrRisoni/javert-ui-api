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



axios
  .get("http://192.168.122.107:8080/zpool")
  .then(function(response) {
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
  .catch(function(error) {
    // handle error
    console.log("error");
  });
