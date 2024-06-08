// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Ticket = require('./models/Ticket');

// Определите основные настройки Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'API документация с использованием Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'MedMate',
    },
  ],
  tags:[{
    name: 'Tickets',
    description: 'API для управления заявками'
  },
      {
        name: 'Auth',
        description: 'API для авторизации и поддержки сессии'

     }]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './server.js'], // Путь до ваших файлов с маршрутами
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
