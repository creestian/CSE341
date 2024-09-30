const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accesss-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })

app.use('/', require('./routes'));

mongodb.initDb ((error)=> {
    if(error) {
        console.log(error)
    } else {
        app.listen(port, () => {
            console.log(`Database and Node is Running on Port ${port}`);
           
        })

    }
})




