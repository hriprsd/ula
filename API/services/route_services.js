const axios = require('axios');
const googleMaps = require('@google/maps');
const {SphericalUtil, PolyUtil} =  require("node-geometry-library");
const apiKey = 'AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
async function getRoute(startLocation, endLocation) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(startLocation)}&destination=${encodeURIComponent(endLocation)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status !== 'OK') {
        throw new Error('Failed to get route');
    }

    const route = response.data.routes[0];
    return route;
}


async function getGeolocation(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status !== 'OK') {
        throw new Error('Failed to get geolocation');
    }
    const location = response.data.results[0].geometry.location;
    return location;
}


function getIsLocationOnEdge(poly, point, tolerance) {
    LocationPoints = PolyUtil.decode(poly); 
    //console.log(LocationPoints) 
    let result1 = PolyUtil.isLocationOnEdge(point, LocationPoints, tolerance)
    let result2 = PolyUtil.isLocationOnPath(point, LocationPoints, tolerance)
    let result3 = PolyUtil.isLocationOnEdgeOrPath(point, LocationPoints, tolerance)
    let result4 = PolyUtil.containsLocation(point, LocationPoints, tolerance)
    let results = {
        isLocationOnEdge: result1,
        isLocationOnPath: result2,
        isLocationOnEdgeOrPath: result3,
        containsLocation: result4
    }
    return results;
}

console.log(getGeolocation('Pallavaram, Chennai'))

module.exports = {
    getRoute,
    getGeolocation,
    getIsLocationOnEdge
};


