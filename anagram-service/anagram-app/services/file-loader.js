const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

// asynchronous file loader passing in a function to load the keys in a map.  Returns a promise
module.exports = {

  loadFileToMap: function (addKeysToMap, fileLocation) {
    let map = new Map
    let size = 0
    var promise = new Promise(function (resolve, reject) {
      const readStream = createInterface({
        input: createReadStream(fileLocation),
        crlfDelay: Infinity
      });

      readStream.on('line', (line) => {
        addKeysToMap(line, map)
        size++
      });

      readStream.once('close', () => {
        resolve({"map": map, "size": size})
      });
    })
    return promise

  }
}