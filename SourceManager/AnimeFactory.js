const KitsuSource = require('./Sources/KitsuSource');
const MALSource = require('./Sources/MALSource');

let ServiceManager = null;

let AnimeSourceArray = null;

module.exports.AnimeFactory = {

    setup: function setup(serviceManager) {
        ServiceManager = serviceManager;
        let kitsuSource = new KitsuSource(ServiceManager);
        let malSource = new MALSource(ServiceManager);
        AnimeSourceArray = {
            kitsu: kitsuSource,
            mal: malSource
        };
    },
    getRandomAnime: function getRandomAnime(source, username) {
        return source in AnimeSourceArray
            ? AnimeSourceArray[source].getRandomAnime(username) : null;
    },
};
