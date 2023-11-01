const mongoose = require("mongoose");
require('dotenv').config();

// Connecting MongoDB
mongoose.connect(process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  6000
);

const database = mongoose.connection;
// ecouteur d'évènement 'error'
database.on('error', (error) => {
  console.log('Unable to connect to Database. Err= ' + error);
});

// ecouteur d'évènement 'coonnected'
database.once('connected', ()=>{
  console.log('Database connected'); 
})