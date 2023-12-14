const proj4 = require('proj4');

proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs("EPSG:3395", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");


const generateRandomHexColor = () => {
    const randomColorComponent = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

    const red = randomColorComponent();
    const green = randomColorComponent();
    const blue = randomColorComponent();

    const hexColor = `#${red}${green}${blue}`;

    return hexColor;
}

const generateOptions = () => {
    return {
        "fillColor": generateRandomHexColor(),
        "fillOpacity": 0.5,
        "strokeWidth": 0,
    };
}

const convertFromJson = (originalData) => {
    const newJSON = {
        "type": originalData.geometry.type,
        "coordinates": originalData.geometry.coordinates.map(arr => arr.map(arr => { let coord = proj4("EPSG:3395", "EPSG:4326", arr); return [coord[1], coord[0]] })),
        "properties": originalData.properties,
        "options": generateOptions()
    };

    return newJSON;
}

module.exports = { convertFromJson };