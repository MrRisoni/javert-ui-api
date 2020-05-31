require ('custom-env').env('staging')
const mongoose = require('mongoose');
const schemas = require("./mongoSchemas");

const connStr = 'mongodb+srv://' +  process.env.MONGO_USR + ':' + process.env.MONGO_PASSWD + '@' + process.env.MONGO_HOST +'/' + process.env.MONGO_DBNAME +'?retryWrites=true&w=majority';

mongoose.connect(connStr, {useNewUrlParser: true, useUnifiedTopology: true});



var HostMdl = mongoose.model('Host', schemas.hostSchema);
  var publicData = new HostMdl({ hostname: 'loadbalance_eu',hostUrl:'1121',fileSys:'zfs' });
publicData.save().then(() => console.log('meow'));


/*
var memorySchema = new mongoose.Schema({
  hostId     : { type : String ,required:true  },
  name     : { type : String,required:true   },

  used : { type:  Number,required:true   },
  total : { type:  Number ,required:true  }

}, { timestamps: { createdAt: 'created_at' }});
*
var memoryMdl = mongoose.model('Memory', memorySchema);
var loadeu = new memoryMdl({hostId:'5eb91bc4590f72188ca9fbe8', name: 'Memory',used:30000,total:32000 });
loadeu.save().then(() => console.log('meow'));

/*
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

*/
