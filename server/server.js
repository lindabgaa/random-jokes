const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const sequelize = require("./config/database.js");
const jokeRoutes = require("./routes/jokeRoutes.js");

const app = express();

const PORT = process.env.PORT || 3000;

// Configuration CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
};

// Configuration Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Blagues Carambar",
      version: "1.0.0",
      description:
        "Cette API permet de gérer une collection de blagues Carambar. Avec elle, vous pouvez ajouter de nouvelles blagues, récupérer une blague aléatoire, lister toutes les blagues disponibles, et récupérer une blague précise en utilisant son ID, apportant ainsi une touche d’humour à vos projets !",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", jokeRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("La base de données est synchronisée ! ");
    app.listen(PORT, () => {
      console.log(`Le serveur est lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(
      "Erreur lors de la synchronisation de la base de donnée :",
      err
    );
  });
