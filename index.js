const express = require('express')
const app = express()
const cors = require('cors')
const databaseConnection = require('./model/connection')
require('dotenv').config()

// Middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Routes
const userRoutes = require('./routes/user.routes');

// Using Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.use('/api/users', userRoutes);

// Listener
databaseConnection();
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
