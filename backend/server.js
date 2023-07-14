const express = require("express");
const cors = require("cors");
const { keys } = require("./config");
const rootRoutes = require("./routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");

const app = express();
app.use(bodyParser.json());
const PORT = keys.PORT;

app.use(cors());

app.use("/api", rootRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger api

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: http://localhost:${PORT}`);
  });
});
