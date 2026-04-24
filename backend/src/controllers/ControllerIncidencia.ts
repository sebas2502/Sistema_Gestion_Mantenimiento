import { Request, Response } from "express";
import { ServiceIncidencia } from "../services/ServiceIncidencia";

export class ControllerIncidencia {
  constructor(private incidenciaService: ServiceIncidencia) {}

  // =========================
  // 🛠️ CREAR INCIDENCIA
  // =========================
  crearIncidencia = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      // 🔍 DEBUG (lo podés dejar por ahora)
      console.log("BODY:", data);
      console.log("ES ARRAY:", Array.isArray(data));

      // ❌ VALIDACIÓN IMPORTANTE
      if (Array.isArray(data)) {
        return res.status(400).json({
          error: "Se esperaba una incidencia (objeto), no un array",
        });
      }

      // ❌ VALIDACIONES BÁSICAS (mínimas pero reales)
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

      // 🔥 LLAMADA AL SERVICE
      const resultado =
        await this.incidenciaService.crearIncidencia(data);

      // ✅ RESPUESTA
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
  // 📋 LISTAR INCIDENCIAS
  // =========================
  obtenerIncidencias = async (_req: Request, res: Response) => {
    console.log(_req.body);
    console.log(Array.isArray(_req.body));
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
  // 🔍 OBTENER POR ID
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