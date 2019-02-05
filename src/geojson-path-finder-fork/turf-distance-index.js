/* eslint-disable */
import {getCoord} from '@turf/invariant';
import {radiansToDistance} from '@turf/helpers';

// http://en.wikipedia.org/wiki/Haversine_formula
// http://www.movable-type.co.uk/scripts/latlong.html

/**
 * Calculates the distance between two {@link Point|points} in degrees, radians,
 * miles, or kilometers. This uses the
 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @name distance
 * @param {Geometry|Feature<Point>|Array<number>} from origin point
 * @param {Geometry|Feature<Point>|Array<number>} to destination point
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 *
 * var distance = turf.distance(from, to, "miles");
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function distance(from, to, options) {
    // Backwards compatible with v4.0
    const units = typeof options === 'object' ? options.units : options;

    const degrees2radians = Math.PI / 180;
    const coordinates1 = getCoord(from);
    const coordinates2 = getCoord(to);
    const dLat = degrees2radians * (coordinates2[1] - coordinates1[1]);
    const dLon = degrees2radians * (coordinates2[0] - coordinates1[0]);
    const lat1 = degrees2radians * coordinates1[1];
    const lat2 = degrees2radians * coordinates2[1];

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

    return radiansToDistance(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
}

export default distance;
