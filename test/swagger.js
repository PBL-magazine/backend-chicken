const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

const option = {
  swaggerDefinition: {
    info: {
      title: "항해 magazine API",
      version: "1.0.0",
      description: "Test Api with express",
    },
    host: "localhost:5500",
    basePath: "/",
  },
  apis: ["./src/controllers/*.js", "./swagger/"],
}

const specs = swaggerJsdoc(option)

module.exports = {
  swaggerUi,
  specs,
}
