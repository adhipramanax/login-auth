const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/api/users.js",
  "./routes/api/authentication.js",
  "./routes/api/cars.js",
];

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:9090",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../app.js"); // Your project's root file
});
