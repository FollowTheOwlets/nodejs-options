const Datastore = require('nedb-promises');
const fs = require('fs');
const { convertFromJson } = require('../utils/utils.js');

class GeoService {
    static store = Datastore.create('./db/store.db');

    static async init() {
        const geoJsonContent = fs.readFileSync('./db/init.geojson', 'utf-8');
        const geoJsonArray = JSON.parse(geoJsonContent);
        for (const geoObject of geoJsonArray) {
            GeoService.saveOne(convertFromJson(geoObject));
        }
    }

    static async saveOne(data) {
        const check = await GeoService.store.findOne({ coordinates: data.coordinates });
        if (!check)
            return GeoService.store.insert(data);
        else
            return GeoService.store.update({ _id: data._id }, data);
    }

    static async remove(data) {
        let check = await GeoService.store.findOne({ _id: data._id });
        if (check) {
            console.log(check);
            return GeoService.store.removeOne({ _id: data._id });
        } else {
            const object = await GeoService.store.findOne({ coordinates: data.coordinates });
            console.log(object);
            return GeoService.store.removeOne({ _id: object._id });
        }
    }

    static async saveAll(data) {
        data.forEach(element => {
            GeoService.saveOne(element);
        });
    }

    static async load() {
        return GeoService.store.find({});
    }

}

module.exports = GeoService;