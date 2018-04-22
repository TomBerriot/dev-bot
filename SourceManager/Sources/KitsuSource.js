const Source = require('../abs/Source');
let kitsuApi = null;

let ServiceManager = null;

const KitsuApiSource = function KitsuApiSource(serviceManager, source = null) {
	Source.call(this, source);
	ServiceManager = serviceManager;
	kitsuApi = require('../KitsuApi').getInstance().getClient();
};

KitsuApiSource.prototype.getRandomAnime = function getRandomAnime(username) {
	let userId = undefined;

	return kitsuApi.get('users', {
		fields: { users: 'name' },
		filter: { name: username },
	}).then(user=>{
		if(!user) return undefined;
		userId = user.data[0].id;
		return kitsuApi.get('libraryEntries', {
			page:{ limit: 1 },
			fields:{ libraryEntries: 'status' },
			filter:{
				userId: userId,
				status: 'completed',
				kind: 'anime',
			},
		});
	}).then(libraryEntries=>{
		if(!userId) return undefined;
		const offset = Math.floor(Math.random() * libraryEntries.meta.statusCounts.completed);
		return kitsuApi.get('libraryEntries', {
			page:{ offset: offset, limit: 1 },
			include: 'anime',
			filter:{
				userId: userId,
				status: 'completed',
				kind: 'anime',
			},
		});
	}).then(randomEntry=>{
		if(!userId) return undefined;
		return randomEntry.data[0].anime.canonicalTitle;
	}).catch(error=>{
		ServiceManager.getLogger().error(`KitsuSource${ error.toString()}`);
		return undefined;
	});
};

module.exports = KitsuApiSource;
