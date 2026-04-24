import express from "express";
import { ControllerOrdenTrabajo } from "../controllers/ControllerOrdenTrabajo";
import { ServiceOrdenTrabajo } from "../services/ServiceOrdenTrabajo";
import { AppDataSource } from "../db/DataSource";
import { TareaMantenimiento } from "../models/TareaMantenimiento";
import { DetalleOrden } from "../models/DetalleOrden";
import { OrdenTrabajo } from "../models/OrdenTrabajo";

export const routerOrden = express.Router();

const repoTarea = AppDataSource.getRepository(TareaMantenimiento);
const repoOrden = AppDataSource.getRepository(OrdenTrabajo);
const repoDetalle = AppDataSource.getRepository(DetalleOrden);

const serviceOrden = new ServiceOrdenTrabajo(repoOrden,repoTarea,repoDetalle);

const controllerOrden = new ControllerOrdenTrabajo(serviceOrden);

routerOrden
  .route('/:ordenId/detalles/:detalleId')
  .patch(controllerOrden.completarDetalle);