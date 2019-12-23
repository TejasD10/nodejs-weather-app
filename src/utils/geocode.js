const request = require('request')

const geocode = (address, callback) => {
    // Validate if address is not empty
    if (! address || address.length === 0)
        callback('Null or empty address found', undefined)
    
    // URL for the API with the encoded addressd
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVqYXNkMTA5MCIsImEiOiJjazQwZTR0dTkwMHJjM21xcm15cXo4MjhpIn0.z4m0vI9d_4dPLawXc-S46A&limit=1'

    request( { url: URL, json: true}, (error, {body}) => {
        if (error) {
            callback('Error Occured while getting the geolocation', undefined)
        } else if (body.features.length === 0) {
            callback('No match found!',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode