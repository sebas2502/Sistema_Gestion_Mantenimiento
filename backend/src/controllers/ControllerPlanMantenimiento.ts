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

  

}