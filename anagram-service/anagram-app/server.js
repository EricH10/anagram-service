var http = require('http');
const app = require("./config/express-config");
const anagramCache = require('./services/anagram-cache.js');
const fileLoader = require('./services/file-loader.js');
    //builds cache then starts server
    anagramCache.buildCache().then( data =>{

    var server = app.listen(process.env.PORT || 3000, function () {
        console.log("anagram cache Loaded.  Size of cache = " + anagramCache.size())
        var host = server.address().address;
        var port = server.address().port;
        console.log("listening at http://%s:%s", host, port);
});
}).catch(err => console.log("Problem loading anagram cache"))
