const request = require('request')

const forecast = (latitude, longitude, callback) => {
    if (isNaN(latitude) || isNaN(longitude)) callback('Latitude and Longitude should be numbers', undefined)

    //Define the URL with the latitude and longitude
    const URL = 
        'https://api.darksky.net/forecast/6037fee7dcf22a272abc63dc25189d42/'+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request ( { url: URL, json: true}, (error, {body}) => {
        if (error) callback (error, undefined)
        else if (body.error) callback('Unable to find location', undefined)
        else callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
    })

}

module.exports = forecast