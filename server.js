const express = require('express');
const mongodb = require('./database/db');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        }); // Server is running on port 3000
    }
});
app.use('/', require('./routes'));

