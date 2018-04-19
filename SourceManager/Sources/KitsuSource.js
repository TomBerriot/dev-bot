const Source = require('../abs/Source');
let kitsuApi = null;

let ServiceManager = null;

const KitsuApiSource = function KitsuApiSource(serviceManager, source = null) {
    Source.call(this, source);
    ServiceManager = serviceManager;
    kitsuApi = require('../KitsuApi').getInstance().getClient();
};

KitsuApiSource.prototype.getRandomAnime = async function getRandomAnime(username) {
    let user = await kitsuApi.get('users', {
        fields: { users: 'name' },
        filter: { name: username }
    });
    let libraryEntries = await kitsuApi.get('libraryEntries', {
        page:{ limit: 1 },
        fields:{ libraryEntries: 'status' },
        filter:{ userId: user.data[0].id,
                status: 'completed',
                kind: 'anime' }
    });

    let offset = Math.floor(Math.random() * libraryEntries.meta.statusCounts.completed)

    let randomEntry = await kitsuApi.get('libraryEntries', {
        page:{ offset: offset, limit: 1 },
        include: 'anime',
        filter:{ userId: user.data[0].id,
                status: 'completed',
                kind: 'anime' }
    });
    return randomEntry.data[0].anime.canonicalTitle;
};

module.exports = KitsuApiSource;
