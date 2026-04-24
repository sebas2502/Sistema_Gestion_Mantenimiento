import express from "express";
import { ControllerActivo } from "../controllers/ControllerActivo";
import { ServiceActivo } from "../services/ServiceActivo";
import { AppDataSource } from "../db/DataSource";
import { Activo } from "../models/Activo";

const serviceActivo = new ServiceActivo(
  AppDataSource.getRepository(Activo)
);

const controllerActivo = new ControllerActivo(serviceActivo);

export const routerActivo = express.Router();

routerActivo.get("/", controllerActivo.obtenerActivos);
routerActivo.get("/:id", controllerActivo.obtenerActivoPorId);