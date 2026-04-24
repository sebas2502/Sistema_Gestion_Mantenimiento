import express from "express";
import { AppDataSource } from "./db/DataSource";
import { routerMain } from "./routers/RouterMain";
import dotenv from "dotenv";
import { routerIncidencia } from "./routers/RouterIncidencia";
import cors from "cors";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 4000;


AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB conectada");

    app.listen(PORT, () => {
      console.log(`🚀 Server en http://localhost:${PORT}`);
    });

    })
  .catch((error) => console.log(error));

  app.use('/api' , routerMain);
