import Photographer from '../models/photographersModels.js'
export default class PhotographerFactory {
    constructor(data, type) {
        if(type === 'Api') {
            return new Photographer(data)
        } else  {
            throw 'Unknown format type'
        }
    }
}