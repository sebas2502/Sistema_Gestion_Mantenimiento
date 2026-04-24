import express from 'express';
import { routerAnalisis } from './RouterAnalisis';
import { routerIncidencia } from './RouterIncidencia';
import { routerOrden } from './RouterOrden';
import { routerPlanMantenimiento } from './RouterPlanMantenimiento';
import { routerActivo } from './RouterActivos';



export const routerMain = express.Router();

routerMain.use('/analisis' , routerAnalisis);
routerMain.use('/incidencias' , routerIncidencia);
routerMain.use('/ordenes' , routerOrden);
routerMain.use('/planes' , routerPlanMantenimiento);
routerMain.use('/activos' , routerActivo);
