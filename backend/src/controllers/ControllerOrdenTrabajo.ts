import { Request, Response } from "express";
import { ServiceOrdenTrabajo } from "../services/ServiceOrdenTrabajo";

export class ControllerOrdenTrabajo {
  constructor(private service: ServiceOrdenTrabajo) {}

  obtenerOrdenes = async (req: Request, res: Response) => {
    try {
      const ordenes = await this.service.obtenerOrdenes();
      res.json(ordenes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerOrden = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const orden = await this.service.obtenerOrdenPorId(Number(id));
      res.json(orden);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  completarDetalle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const detalle = await this.service.completarDetalle(Number(id));
      res.json(detalle);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}