const CodingLoveSource = require('./Sources/CodingLoveSource');


const CodingLove = new CodingLoveSource('thecodinglove.com')
const DevMemesSourceArray = [
     CodingLove
];

module.exports.DevMemesFactory = {

    getRandomMeme: function getRandomMeme() {
        var sourceIndex = Math.floor(Math.random() * DevMemesSourceArray.length)
        return DevMemesSourceArray[sourceIndex].getRandomMeme()
    },
};
