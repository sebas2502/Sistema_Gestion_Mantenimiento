import { Request, Response } from "express";
import { ServicePlanMantenimiento } from "../services/ServicePlanMantenimiento";

export class ControllerPlanMantenimiento {

  constructor(
    private service: ServicePlanMantenimiento
  ) {}

  // =========================
  // 🟡 EJECUTAR PREVENTIVOS
  // =========================
  ejecutar = async (
    req: Request,
    res: Response
  ) => {

    try {

      const resultado =
        await this.service
          .ejecutarPlanesPreventivos();

      res.json({
        message: "Planes ejecutados correctamente",
        data: resultado,
      });

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // ➕ CREAR PLAN
  // =========================
  crearPlan = async (
    req: Request,
    res: Response
  ) => {

    try {

      const plan =
        await this.service.crearPlan(
          req.body
        );

      res.status(201).json(plan);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // 📋 OBTENER PLANES
  // =========================
  obtenerPlanes = async (
    req: Request,
    res: Response
  ) => {

    try {

      const planes =
        await this.service.obtenerPlanes();

      res.json(planes);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // 🔍 OBTENER POR ID
  // =========================
  obtenerPorId = async (
    req: Request,
    res: Response
  ) => {

    try {

      const plan =
        await this.service.obtenerPorId(
          Number(req.params.id)
        );

      res.json(plan);

    } catch (error: any) {

      res.status(404).json({
        error: error.message,
      });
    }
  };

  // =========================
  // ✏️ ACTUALIZAR PLAN
  // =========================
  actualizarPlan = async (
    req: Request,
    res: Response
  ) => {

    try {

      const plan =
        await this.service.actualizarPlan(
          Number(req.params.id),
          req.body
        );

      res.json(plan);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };

  // =========================
  // ❌ DESACTIVAR PLAN
  // =========================
  desactivarPlan = async (
    req: Request,
    res: Response
  ) => {

    try {

      const plan =
        await this.service.desactivarPlan(
          Number(req.params.id)
        );

      res.json(plan);

    } catch (error: any) {

      res.status(500).json({
        error: error.message,
      });
    }
  };
}