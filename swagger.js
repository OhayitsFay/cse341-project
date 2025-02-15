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
const endpointFiles = ['./routes/index.js'];

// THi will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);