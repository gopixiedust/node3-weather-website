const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=07eb9763ac65c1860a470e3f29dc04c2&query=' + latitude + ','+ longitude + '&units=f'
    request({url:url,json: true},(error,response) => {
        if (error) {
            console.log('Unable to proces your request!',undefined)
        }
        else if (response.body.error) {
            console.log('not a valid location!',undefined)
        }
        else {
            callback(undefined,response.body.current.weather_descriptions[0]+'. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degress out')
        }

    })
}

module.exports = forecast