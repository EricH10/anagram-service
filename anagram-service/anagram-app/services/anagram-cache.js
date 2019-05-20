const fileLoader = require('./file-loader.js');
const anagram = require('./anagram.js');
//global cache for anagrams
class AnagramCache {
    constructor() {
        this.cache = null
        this.wordsInCache = 0
    }

    getAnagramsByKey(word) {
        const anagrams = anagram.findAnagrams(word, this.cache)
        return anagrams
    }
    clearCache(){
        this.cache.clear()
    }

    size(){
        return this.cache.size
    }
    
    returnCache() {
        return this.cache
    }

    deleteWordFromCache(word) {
        return anagram.deleteWord(word, this.cache)
    }

    deleteKeyFromCache(word) {
        return anagram.deleteKey(word, this.cache)
    }

    addToCache(listOfWords) {
        var added = listOfWords.forEach(word => anagram.addWordToMap(word,this.cache))
    }

    async buildCache(){
        const fileLocation = './dictionary.txt'
        const resultFromFile = await fileLoader.loadFileToMap(anagram.buildAnagramMap, fileLocation)
        this.cache = resultFromFile.map
        this.wordsInCache = resultFromFile.size

        return this.cache.size > 0 ? true : false; 
    }

}

module.exports = new AnagramCache;