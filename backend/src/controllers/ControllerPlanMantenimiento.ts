import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { ServicePlanMantenimiento } from "../services/ServicePlanMantenimiento";
import { Request , Response } from "express";

export class ControllerPlanMantenimiento {
  constructor(private service: ServicePlanMantenimiento) {}

  ejecutar = async (req: Request, res: Response) => {
    try {
      const resultado = await this.service.ejecutarPlanesPreventivos();

      res.json({
        message: "Planes ejecutados",
        data: resultado,
      });
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerPlanes = async (req:Request , res:Response) => {
    try {
      const planes = await this.service.obtenerPlanes();
      res.json(planes);
    } catch (error:any) {
       res.status(500).json({ error: error.message });
    }
  }

  

}