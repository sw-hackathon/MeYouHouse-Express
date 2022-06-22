export const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "집톡 API",
      version: "1.0.0",
      description: "집톡 API with express",
    },
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

export const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
