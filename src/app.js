const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

//define paths for express config
const htmldir = path.join(__dirname,'../public')

const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(htmldir))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Siddham Anand'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a location '
        })
    }
    //console.log(req.query.search)
    geocode(req.query.search,(error,{lat,long,locat}={}) =>{
        if(error) {
            return res.send({error:error})
        }
        forcast(lat,long,(error,forecastdata) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast : forecastdata,
                locat,
                address : req.query.search
            })
        })
    })
    
})


app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search Term!'
        })
    }
    //console.log(req.query.search)
    res.send({
        products :[]
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Siddham Anand'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        message:'Need any help!',
        title:'Help',
        name:'Siddham Anand'

    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'Error',
        name:'siddham anand',
        errorMessage:'This help article not found!'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'Error',
        name:'siddham anand',
        errorMessage:'My 404 error !!'
    })
})

// Setup static directory to serve


//app.get('',(req,res) => {
  //  res.send('Hello express!')
//})
//app.get('/help',(req,res) => {
//    res.send([
   //     {
 //           name:'siddham'
 //       },
 //       {
    //        name:'lilly'
  //      },
     //   {
       //     name:'rolls'
      //  }
   // ]
  //  )
//})
/*app.get('/about',(req,res) => {
    res.send('<h1>About</h1>')
})
app.get('/weather',(req,res) => {
    res.send({
        forcast:'asd',
        location : 'delhi'
    })
})*/
//app.com
//app.com/help
//app.com/about


app.listen(3000, () => {
    console.log('Server rocks')
})
