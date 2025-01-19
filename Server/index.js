require("dotenv").config(); // Load all .env variables
const app = require("./app");
const { TestConnection } = require("./database/db");

// Explitly import index.js to import models to initialize them and their relationships
require("./models/index");

const PORT = process.env.PORT;

// Test the db connection
TestConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
