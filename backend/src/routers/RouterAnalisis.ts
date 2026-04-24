import express from 'express';
import { ControllerAnalisis } from '../controllers/ControllerAnalisis';
import { ServiceAnalisis } from '../services/ServiceAnalisis';
import { AppDataSource } from '../db/DataSource';
import { Incidencia } from '../models/Incidencia';
import { Analisis } from '../models/Analisis';
import { Alerta } from '../models/Alerta';
import { ServiceRecomendacion } from '../services/ServiceRecomendacion';
import { OrdenTrabajo } from '../models/OrdenTrabajo';
import { ServiceOrdenTrabajo } from '../services/ServiceOrdenTrabajo';
import { TareaMantenimiento } from '../models/TareaMantenimiento';
import { DetalleOrden } from '../models/DetalleOrden';


const serviceOrdenTrabajo = new ServiceOrdenTrabajo(
    AppDataSource.getRepository(OrdenTrabajo),
    AppDataSource.getRepository(TareaMantenimiento),
    AppDataSource.getRepository(DetalleOrden)
);

const serviceAnalisis = new ServiceAnalisis(
  AppDataSource.getRepository(Incidencia),
  AppDataSource.getRepository(Analisis),
  AppDataSource.getRepository(Alerta),
  new ServiceRecomendacion(),
  serviceOrdenTrabajo   
);

const controllerAnalisis = new ControllerAnalisis(serviceAnalisis);

export const routerAnalisis = express.Router();



routerAnalisis.route('/:activoId')
                    .post(controllerAnalisis.analizarActivo);

