const validation = require('../utils/validation-utils.js');
//helper functions to manipulate a map and return or save new words to a map
//Also any other anagram specific functionality
module.exports = {

    buildAnagramMap: function (line, map) {
        const lowercase = line.toLowerCase()
        const sortedString = lowercase.split('').sort().join('')
        if (map.has(sortedString)) {
            const array = Object.values(map.get(sortedString))
            array.push(lowercase);
            map.set(sortedString, array)
        } else {
            const newArray = [lowercase]
            map.set(sortedString, newArray)
        }
        return map;
    },

    findAnagrams: function (word, map) { 
        const lowercase = word.toLowerCase()
        const sortedString = lowercase.split('').sort().join('')
        if (map.has(sortedString)) {
            return map.get(sortedString).filter(anagram => anagram != lowercase)
        } else {
            return []
        }

    },
    addWordToMap: function (word, map) {
        const maxWordLength = 100

        if (!validation.isGreaterThanMaxStringSize(word, maxWordLength)) {
            const lowercase = word.toLowerCase()
            const sortedString = lowercase.split('').sort().join('')

            if (map.has(sortedString)) {
                const array = Object.values(map.get(sortedString))
                array.push(lowercase);
                map.set(sortedString, array)
            } else {
                const newArray = [lowercase]
                map.set(sortedString, newArray)
            }

        } else {
            return false
            console.log("Word length is greater than " + maxWordLength)
        }

    },

    deleteWord: function (word, map) {
        const lowercase = word.toLowerCase()
        const sortedString = lowercase.split('').sort().join('')

        if (map.has(sortedString)) {
            const listOfAnagrams = map.get(sortedString)
            const listWithRemovedWord = listOfAnagrams.filter(anagram => anagram != lowercase)
            map.set(sortedString, listWithRemovedWord)
            console.log("Word deleted " + lowercase)
        } else {
            console.log("Word Not Found " + word)
        }

    },

    deleteKey(word, map) {
        const lowercase = word.toLowerCase()
        const sortedString = lowercase.split('').sort().join('')

        if (map.has(sortedString)) {
            map.delete(sortedString)
            console.log("All Anagrams of Word deleted: word = " + lowercase)
        } else {
            console.log("Word Not Found " + word)
        }

    },
    //compare every word to the first word in the list. For them to all be anagrams of each other they should all match the first word.
    areAnagrams(list) {
        let isAnagram = true;
        const firstWordInList = list[0].toLowerCase().split('').sort().join('')
        list.forEach(word => {
            const sortedString = word.toLowerCase().split('').sort().join('')

            if (sortedString != firstWordInList) {
                console.log(sortedString, firstWordInList)
                isAnagram = false
            }
        });
        return isAnagram
    },


}
