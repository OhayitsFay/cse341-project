const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title:'Event Planning API',
        description: 'Event Planning API'
    },
    host: 'cse341-project-aryv.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// THi will generate swagger.json
swaggerAutogen(outputFile, routes, doc);