//builds statistics on word data from scratch
//could optimize average by keeping a total count of characters and adding and subtracting when words are added/deleted
var _ = require('lodash');
module.exports = {

    getStats: function (map) {
        listFromMap = convertStringListToCharCount(convertMapToList(map))
        let stats = {}
        stats.wordCount = listFromMap.length
        stats.max = listFromMap[listFromMap.length -1]
        stats.min = listFromMap[0]
        stats.median = getMedian(listFromMap)
        stats.averageCount = getAverageCount(listFromMap)

        return stats
    }
}
//could have used .values instead of getting all the values this way
const convertMapToList = (map) => {
    const keys = [...map.keys()]
    let flattenedArray = []
    keys.forEach(key => {
        flattenedArray.push(map.get(key))
    });
    return _.flatten(flattenedArray)
}

const getMedian = (list) => {
    const mid = Math.floor(list.length / 2)
    if (list.length < 1) {
        return 0
    }
    if (list.length % 2 === 0) {
        return (midsAdded = list[mid] + list[mid - 1]) / 2
    } else {
        return list[mid]
    }
}
//could use reduce here
const getAverageCount = (list) => {
    let total = 0;
    list.forEach(length => {
        total += length
    });
    return total / list.length
}

const convertStringListToCharCount = (list) => {
    listOfStringLength = list.map(string => {
        return string.length
    })
    return listOfStringLength.sort((a, b) => a - b)
}
