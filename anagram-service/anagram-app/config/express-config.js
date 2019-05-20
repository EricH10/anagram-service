const express = require("express");
const bodyParser = require("body-parser");
//may or may not want to configure cors.  Defaulting to allow cors for now
var cors = require('cors')

    let app = express();
    app.use(cors());

    app.use(bodyParser.json());

    const anagramRoutes = require('../routes/anagram-routes.js');
    app.use('/', anagramRoutes);

    module.exports = app;

  