module.exports = {

    filterMax: (list, max) => {
        if (max != null) {
            const list2 = list.slice(0, max)
            return list2
        } else {
            return list
        }
    },

    returnMaxListSize: (list, max) => {
        if (list.length > max) {
            return list.slice(0, max)
        } else {
            return list
        }
    },

    isGreaterThanMaxStringSize: (string, max) => {
        if (string.length > max) {
            return true
        } else {
            return false
        }
    }
}