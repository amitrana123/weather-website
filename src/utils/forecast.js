const request = require('request');

const forecast = (latitude, longitude, callback) => {
    //const url = "http://api.weatherstack.com/current?access_key=f25ead1263049268d312873a676c0c09&query=" + 'almora';
    const url = "http://api.weatherstack.com/current?access_key=f25ead1263049268d312873a676c0c09&query=" + latitude + ',' + longitude;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to server', undefined);
        } else if (response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions[0]
            })
        }
    })
};

module.exports = forecast;
