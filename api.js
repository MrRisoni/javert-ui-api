//require('custom-env').env('staging')
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

const mon_usr = process.env.MONGO_USR || 'monusr';
const mon_psw = process.env.MONGO_PASSWD || 'monusr';
const mon_host = process.env.MONGO_HOST || 'monusr';
const mon_db = process.env.MONGO_DBNAME || 'monusr';


const connStr = 'mongodb+srv://' + mon_usr + ':' + mon_psw + '@' + mon_host + '/' + mon_db + '?retryWrites=true&w=majority';
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

app.get('/api/hostinfo', (req, res) => {
    fetchCtrl.getHostData(req.params.hostId).then(data => {
                res.send({zfslist:data[0]});
   }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.get('/api/hosts', (req, res) => {
    fetchCtrl.getHosts().then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});


app.post('/api/zfs/list', (req, res) => {
    console.log(req.body)
            res.sendStatus(200);

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