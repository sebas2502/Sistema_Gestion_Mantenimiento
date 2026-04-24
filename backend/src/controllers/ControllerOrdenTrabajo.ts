import { Request, Response } from "express";
import { ServiceOrdenTrabajo } from "../services/ServiceOrdenTrabajo";

export class ControllerOrdenTrabajo {
  constructor(private service: ServiceOrdenTrabajo) {}

  completarDetalle = async (req: Request, res: Response) => {
    try {
      const { ordenId, detalleId } = req.params;

      const result = await this.service.completarDetalle(
        Number(ordenId),
        Number(detalleId)
      );

      res.json({
        message: "Detalle actualizado correctamente",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}