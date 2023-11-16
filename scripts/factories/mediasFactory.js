import Media from '../models/datasMedia.js'
export default class MediasFactory {
    constructor(data, type) {
        if(type === 'Api') {
            return new Media(data)
        } else  {
            throw 'Unknown format type'
        }
    }
}