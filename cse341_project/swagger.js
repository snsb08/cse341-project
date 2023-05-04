const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Books',
        description: 'Books that I have read',
    },
    host: 'localhost:3041',
    schemes:['http'],
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
 