const axios = require("axios");
/*
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
*/
axios
  .get("http://192.168.122.107:8080/zpool")
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    // handle error
    console.log("error");
  });
