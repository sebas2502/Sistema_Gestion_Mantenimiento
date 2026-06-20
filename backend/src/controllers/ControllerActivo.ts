import { Request, Response } from "express";
import { ServiceActivo } from "../services/ServiceActivo";

export class ControllerActivo {
  constructor(private activoService: ServiceActivo) {}

  // =========================
  // Obtener todos los activos
  // =========================
  obtenerActivos = async (_req: Request, res: Response) => {
    try {
      const activos = await this.activoService.obtenerActivos();

      res.json({
        message: "Activos obtenidos correctamente",
        data: activos,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener activos",
      });
    }
  };

  // =========================
  // Buscar activo por id
  // =========================
  obtenerActivoPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const activo = await this.activoService.obtenerActivoPorId(
        Number(id)
      );

      if (!activo) {
        return res.status(404).json({
          error: "Activo no encontrado",
        });
      }

      res.json({
        data: activo,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener activo",
      });
    }
  };
}