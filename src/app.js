const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // changing the default path for "views" to "templates"
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Stefan Rotaru",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Stefan Rotaru",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Don't blame it on the weather!",
    name: "Stefan Rotaru"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address not provided"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({ error })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      })
  })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term"
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found!",
    name: "Stefan Rotaru"
  })
})

app.get('*', (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Stefan Rotaru"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
