// Core modules go before the imported ones
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()


// Setting up the paths
const staticPaths = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

// Set up the static assets
app.use(express.static(staticPaths))

// Set up the templating engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Set up hbs for partials
hbs.registerPartials(partialPaths)

// Route for home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tejas Desai'
    })
})

// Route for about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tejas Desai'
    })
})

//Route for help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Weater information for the specified location',
        title: 'Help',
        name: 'Tejas Desai'
    })
})
// Route for weather
app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: 'You must provide an address'
        })
    
    let address = req.query.address
    // call geocode and forecast
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({error})
    
        forecast(latitude, longitude, (error, response) => {
            if (error) return res.send({error})
            res.send ({
                forecast: response,
                location,
                address
            })
        })
    })
})

// Setup the 404 error handler for /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tejas Desai',
        errorMessage: 'Help article not found'
    })
})

// Setup up the generic 404 error handler
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tejas Desai',
        errorMessage: 'Page not found.'
    })
})

// Start the web server
app.listen(3000, () => {
    console.log('Application started!')
})