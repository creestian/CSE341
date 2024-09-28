const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

app.use('/', require('./routes'));
app.use(bodyParser.json());

mongodb.initDb ((error)=> {
    if(error) {
        console.log(error)
    } else {
        app.listen(port, () => {
            console.log(`Database and Node is Running on Port ${port}`);
           
        })

    }
})




