const routes = require('express').Router();
const anagramCache = require('./../services/anagram-cache.js');
const anagram = require('./../services/anagram.js');
const stats = require('../services/word-stat-builder.js');
const validation = require('../utils/validation-utils.js');

routes.get('/anagrams/:word.json', (req, res) => {
    const anagrams = validation.filterMax(anagramCache.getAnagramsByKey(req.params.word),req.query.limit)
    res.status(200).json({"anagrams": anagrams})
});

routes.post('/words.json', (req, res) => {
    const wordList = validation.returnMaxListSize(req.body.words,1000)
    anagramCache.addToCache(wordList)
    res.status(201).json("true")
});

routes.delete('/words.json', (req, res) => {
    anagramCache.clearCache()
    res.status(204).json("Success")
});

routes.delete('/delete/:word.json', (req, res) => {
    anagramCache.deleteKeyFromCache(req.params.word)
    res.status(204).json("Success");
});

routes.delete('/words/:word.json', (req, res) => {
    anagramCache.deleteWordFromCache(req.params.word)
    res.status(204).json("Success");
});

routes.get('/build-cache', (req, res) => {
    anagramCache.buildCache().then( didComplete => 
        res.status(204).json(didComplete))
});

routes.get('/stats', (req, res) => {
    const statsFromAnagramCache = stats.getStats(anagramCache.returnCache())
    res.status(200).json(statsFromAnagramCache)
});

routes.post('/anagrams/list', (req, res) => {
    const areAnagrams = anagram.areAnagrams(req.body)
    res.status(201).json(areAnagrams)
});

module.exports = routes;