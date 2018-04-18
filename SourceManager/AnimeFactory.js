const KitsuSource = require('./Sources/KitsuSource');

let ServiceManager = null;

let AnimeSourceArray = null;

module.exports.AnimeFactory = {

    setup: function setup(serviceManager) {
        ServiceManager = serviceManager;
        let kitsuSource = new KitsuSource(ServiceManager);
        AnimeSourceArray = [
            kitsuSource
        ];
    },
    getRandomOp: function getRandomOp(username) {
        let sourceIndex = Math.floor(Math.random() * AnimeSourceArray.length);
        return AnimeSourceArray[sourceIndex].getRandomOp(username);
    },
};
