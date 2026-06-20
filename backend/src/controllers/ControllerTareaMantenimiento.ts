import { Request, Response } from "express";
import { ServiceTareaMantenimiento } from "../services/ServiceTareaMantenimiento";

export class ControllerTareaMantenimiento {

  constructor(
    private service: ServiceTareaMantenimiento
  ) {}

  // =========================
  // Creacion de una tarea
  // =========================
  crearTarea = async (req: Request, res: Response ) => {

    try {

      const tarea =
        await this.service.crearTarea(
          req.body
        );

      res.status(201).json(tarea);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // Obtenemos todas las tareas
  // =========================
  obtenerTareas = async (
    req: Request,
    res: Response
  ) => {

    try {

      const tareas = await this.service.obtenerTareas();

      res.json(tareas);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // Obtener uan tarea por id
  // =========================
  obtenerPorId = async (req: Request, res: Response) => {

    try {

      const tarea = await this.service.obtenerTareaPorId( Number(req.params.id) );

      res.json(tarea);

    } catch (error: any) {

      res.status(404).json({
        error: error.message,
      });
    }
  };

  // =========================
  // Obtener tareas por plan de mantenimiento
  // =========================
  obtenerPorPlan = async ( req: Request, res: Response ) => {

    try {

      const tareas = await this.service.obtenerPorPlan( Number(req.params.planId) );

      res.json(tareas);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // Actualizar tarea
  // =========================
  actualizarTarea = async ( req: Request, res: Response ) => {

    try {

      const tarea =  await this.service.actualizarTarea( Number(req.params.id), req.body );

      res.json(tarea);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // Dar de baja una tarea
  // =========================
  eliminarTarea = async ( req: Request, res: Response ) => {

    try {

      const resultado =  await this.service.eliminarTarea( Number(req.params.id) );

      res.json(resultado);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };
}