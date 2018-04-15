const CodingLoveSource = require('./Sources/CodingLoveSource');


var ServiceManager = null;

var DevMemesSourceArray = null;

module.exports.DevMemesFactory = {

    setup: function setup(serviceManager) {
        ServiceManager = serviceManager;
        var CodingLove = new CodingLoveSource(ServiceManager, 'thecodinglove.com');
        DevMemesSourceArray = [
            CodingLove
        ];
    },
    getRandomMeme: function getRandomMeme() {
        var sourceIndex = Math.floor(Math.random() * DevMemesSourceArray.length);
        return DevMemesSourceArray[sourceIndex].getRandomMeme();
    },
};
