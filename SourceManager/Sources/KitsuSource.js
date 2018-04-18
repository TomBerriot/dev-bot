const Source = require('../abs/Source');
let kitsuApi = null;

let ServiceManager = null;

const KitsuApiSource = function KitsuApiSource(serviceManager, source = null) {
    Source.call(this, source);
    ServiceManager = serviceManager;
    kitsuApi = require('../KitsuApi').getInstance().getClient();
};

KitsuApiSource.prototype.getRandomOp = function getRandomOp(username) {
    return kitsuApi.get('users', {
            fields: {
                users: 'name,birthday'
            },
            filter: {
                name: username
            }
        })
        .then(data=>{
            console.log(data);
        })
};

module.exports = KitsuApiSource;
