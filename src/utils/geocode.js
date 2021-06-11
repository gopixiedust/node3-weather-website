const request = require('request')


const geocode = (address, fun) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2lkZGhhbSIsImEiOiJja3BpMTIyN20wNDlnMndxeWtpN29vaHR4In0.9935Ijz9hE2B1ICcEAW82A&limit=1'
    request({url : url, json:true},(error, response) => {
        if (error) {
            fun('Unable to proces your request!',undefined)
        }
        else if (response.body.features.length === 0) {
            fun('not a valid location!',undefined)
        }
        else {
            fun(undefined,{
                
                 lat : response.body.features[0].center[1],
                 long : response.body.features[0].center[0],
                 locat : response.body.features[0].place_name
            })
        }
    })
}
/*geocode('delhi',(error,data) => {
   // console.log(data.lat)
    //console.log(data.long)
    //console.log(data.place_name)
    console.log('Error',error)
    console.log('Data',data)

})*/

module.exports = geocode