import express from "express";
import { ControllerPlanMantenimiento } from "../controllers/ControllerPlanMantenimiento";
import { ServicePlanMantenimiento } from "../services/ServicePlanMantenimiento";
import { AppDataSource } from "../db/DataSource";
import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { OrdenTrabajo } from "../models/OrdenTrabajo";
import { ServiceOrdenTrabajo } from "../services/ServiceOrdenTrabajo";
import { TareaMantenimiento } from "../models/TareaMantenimiento";
import { DetalleOrden } from "../models/DetalleOrden";
import router from "./RouterTareaMantenimiento";

export const routerPlanMantenimiento = express.Router();

const repoPlan = AppDataSource.getRepository(PlanMantenimiento);
const repoOrden = AppDataSource.getRepository(OrdenTrabajo);
const repoTarea = AppDataSource.getRepository(TareaMantenimiento);
const repoDetalleOrden = AppDataSource.getRepository(DetalleOrden);

const serviceOrden = new ServiceOrdenTrabajo(repoOrden,repoDetalleOrden);

const servicePlan = new ServicePlanMantenimiento(repoPlan , serviceOrden);

const controllerPlan = new ControllerPlanMantenimiento(servicePlan);

routerPlanMantenimiento.route('/')
                       .get(controllerPlan.obtenerPlanes) 

routerPlanMantenimiento.post('/ejecutar',controllerPlan.ejecutar)

routerPlanMantenimiento.post('/crear',controllerPlan.crearPlan)

router.patch('/:id/desactivar',controllerPlan.desactivarPlan)