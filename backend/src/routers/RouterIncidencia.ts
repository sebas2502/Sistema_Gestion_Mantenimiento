import express from "express";
import { ControllerIncidencia } from "../controllers/ControllerIncidencia";
import { ServiceIncidencia } from "../services/ServiceIncidencia";
import { ServiceOrdenTrabajo } from "../services/ServiceOrdenTrabajo";
import { AppDataSource } from "../db/DataSource";

import { Incidencia } from "../models/Incidencia";
import { OrdenTrabajo } from "../models/OrdenTrabajo";
import { TareaMantenimiento } from "../models/TareaMantenimiento";
import { DetalleOrden } from "../models/DetalleOrden";

export const routerIncidencia = express.Router();

// 🔹 Repos
const incidenciaRepo = AppDataSource.getRepository(Incidencia);
const ordenRepo = AppDataSource.getRepository(OrdenTrabajo);
const repoTarea = AppDataSource.getRepository(TareaMantenimiento);
const repoDetalle = AppDataSource.getRepository(DetalleOrden);

// 🔹 Services
const ordenService = new ServiceOrdenTrabajo(ordenRepo,repoTarea,repoDetalle);
const incidenciaService = new ServiceIncidencia(
  incidenciaRepo,
  ordenService
);

// 🔹 Controller
const controller = new ControllerIncidencia(incidenciaService);

// 🔥 ENDPOINT DEBUG
routerIncidencia.post("/", controller.crearIncidencia);


// opcionales (ya los tenés)
routerIncidencia.get("/", controller.obtenerIncidencias);
routerIncidencia.get("/:id", controller.obtenerIncidenciaPorId);

