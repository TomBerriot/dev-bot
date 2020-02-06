import Source from './abs/Source';
import Post from './Post';
import CodingLoveSource from './Sources/CodingLoveSource';

class DevMemesFactory {
    private DevMemesSourceArray: Source[];

    constructor() {
        const CodingLove = new CodingLoveSource('thecodinglove.tumblr.com');
        this.DevMemesSourceArray = [CodingLove];
    }

    public getRandomMeme(): Promise<Post> {
        const sourceIndex = Math.floor(
            Math.random() * this.DevMemesSourceArray.length
        );
        const source: Source = this.DevMemesSourceArray[sourceIndex];
        return source.getRandomMeme();
    }
}

export default new DevMemesFactory();
