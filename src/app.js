const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views' );
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amit Rana'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Amit Rana'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some help text.',
        name: 'Amit Rana'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        console.log('You must provide a search parameter')
        return res.send({
            error: 'You must provide a search parameter'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })   
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Amit Rana'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Amit Rana'
    })

});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})