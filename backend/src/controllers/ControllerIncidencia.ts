import { Request, Response } from "express";
import { ServiceIncidencia } from "../services/ServiceIncidencia";

export class ControllerIncidencia {
  constructor(private incidenciaService: ServiceIncidencia) {}

  // =========================
  // Creacion de una incidencia
  // =========================
  crearIncidencia = async (req: Request, res: Response) => {
    try {
      const data = req.body;
  
      

      // Evaluamos si recibimos un objeto, caso contrario informamos el error
      if (Array.isArray(data)) {
        return res.status(400).json({
          error: "Se esperaba una incidencia (objeto), no un array",
        });
      }

      // VALIDACIONES BÁSICAS
      if (!data.descripcion) {
        return res.status(400).json({
          error: "La descripción es obligatoria",
        });
      }

      if (!data.activo || !data.activo.id) {
        return res.status(400).json({
          error: "El activo es obligatorio",
        });
      }

      //Llamamos al servicio
      const resultado = await this.incidenciaService.crearIncidencia(data);

      
      res.status(201).json({
        message: "Incidencia creada correctamente",
        data: resultado,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message || "Error interno del servidor",
      });
    }
  };

  // =========================
  // Obtener incidencias
  // =========================
  obtenerIncidencias = async (_req: Request, res: Response) => {
    ;
    try {
      const incidencias =
        await this.incidenciaService.obtenerIncidencias();

      res.json(incidencias);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // Obtener incidencia por id
  // =========================
  obtenerIncidenciaPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const incidencia =
        await this.incidenciaService.obtenerIncidenciaPorId(
          Number(id)
        );

      if (!incidencia) {
        return res.status(404).json({
          error: "Incidencia no encontrada",
        });
      }

      res.json(incidencia);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
}