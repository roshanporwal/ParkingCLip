const { v4: uuidv4 } = require('uuid');

function getNextUserId(){

    return uuidv4();
}

module.exports = {
    getNextUserId
}