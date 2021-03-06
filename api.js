require('custom-env').env('staging')
const mongoose = require('mongoose');
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

const PutController = require('./PutController');
const putCtrl = new PutController();

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
        console.log('api.js send');
        res.send({zfslist: data[0], zpool: data[1], sysproc: data[2]});
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


setInterval(() => {
    fetchCtrl.getZFSHosts().then(hostsArr => {
        console.log(hostsArr)
        let arr = [];
        hostsArr.forEach(host => {
            putCtrl.zpool(host.hostUrl)
        })


    });
}, 6000)


http.listen(port, (req, res) => {
    console.log('Server listening on port number', port);
});

