const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=babe2cb5623c57bb904cae8c0cb64265&query=${lat},${long}`

    request({ url, json: true }, (error, response) => {
        const { weather_descriptions, temperature, feelslike } = response.body.current;

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (!response.body.current) {
            callback(response.body.error.info, undefined)
        } else {
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees.`)
        }
    })
}

module.exports = forecast;


// `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees.`

// {
//     location: response.body.location.name,
//     weatherDescription: response.body.current.weather_descriptions[0],
//     temperature: response.body.current.temperature,
//     feelslike: response.body.current.feelslike
// }