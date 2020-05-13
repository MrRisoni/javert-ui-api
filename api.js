require('custom-env').env('staging')
const mongoose = require('mongoose');
const schemas = require('./mongoSchemas');
const port = process.env.PORT || 3500;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const connStr = 'mongodb+srv://' + process.env.MONGO_USR + ':' + process.env.MONGO_PASSWD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DBNAME + '?retryWrites=true&w=majority';
mongoose.connect(connStr, {useNewUrlParser: true, useUnifiedTopology: true});

const FetchController = require('./FetchController');
const fetchCtrl = new FetchController();

app.get('/api/zfslist', (req, res) => {
    fetchCtrl.getZFSList(req.params.hostId).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

http.listen(port, (req, res) => {
    console.log('Server listening on port number', port);
});


/*
var zfsMdlItm = mongoose.model('ZFSListItem', schemas.zfsListItemSchema);
var zfsMdl = mongoose.model('ZFSList', schemas.zfsListSchema);


var hjem = new zfsMdlItm({
    name: 'zpisina/usr/home',
    usedRaw: '180K',
    usedMib: 0.18,
    availRaw: '31.8G',
    availMib: 31800,
    mounted: '/usr/home'
});

var root = new zfsMdlItm({
    name: 'zpisina',
    usedRaw: '1.72G',
    usedMib: 1720,
    used: 0.054,
    availRaw: '31.8G',
    availMib: 31800,
    mounted: '/zpisina'
});

var freeBsd = new zfsMdl({hostId: '5ebc2a530d0ffd1c6e5e8a05', items: [root,hjem]});
freeBsd.save().then(() => console.log('freeBsd')).catch(err => console.log(err));

console.log('OK');

*/