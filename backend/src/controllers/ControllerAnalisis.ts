import { Request, Response } from "express";
import { ServiceAnalisis } from "../services/ServiceAnalisis";

export class ControllerAnalisis {
  constructor(private serviceAnalisis: ServiceAnalisis) {}

  
  analizarActivo = async (req: Request, res: Response) => {
    try {
      const { activoId } = req.params;

      
      if (!activoId || isNaN(Number(activoId))) {
        return res.status(400).json({
          error: "activoId inválido",
        });
      }

      const resultado = await this.serviceAnalisis.analizarActivo(
        Number(activoId)
      );

      return res.status(200).json({
        message: "Análisis ejecutado correctamente",
        data: resultado,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Error interno",
      });
    }
  };
}