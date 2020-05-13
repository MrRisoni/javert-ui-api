const mongoose = require('mongoose');

const Hosts = mongoose.model('Host', { hostname: String,description: String });
