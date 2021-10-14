// Setup empty JS object to act as endpoint for all routes
let projectData = '';

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('../frontend'));



// Routes
//GET Route
app.get('/all', (req, res) => {

  res.send(projectData)
})

// POST Route
app.post('/add', (req, res) => {
  projectData = {
    temp: req.body.temp,
    humidity: req.body.humidity,
    WindSpeed: req.body.WindSpeed,
    date: req.body.date,
    feel: req.body.feel
  }
  res.send({
    message: "post received successfully!",
    projectData: projectData
  })
})




// Setup Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});