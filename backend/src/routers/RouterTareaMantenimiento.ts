import { Router } from "express";
import { AppDataSource } from "../db/DataSource";

import { TareaMantenimiento } from "../models/TareaMantenimiento";

import { ServiceTareaMantenimiento } from "../services/ServiceTareaMantenimiento";

import { ControllerTareaMantenimiento } from "../controllers/ControllerTareaMantenimiento";
import { PlanMantenimiento } from "../models/PlanMantenimiento";




// =========================
// REPOSITORIO
// =========================
const tareaRepo =
  AppDataSource.getRepository(
    TareaMantenimiento
  );

  const planRepo = AppDataSource.getRepository(PlanMantenimiento);

// =========================
// SERVICE
// =========================
const service =
  new ServiceTareaMantenimiento(
    tareaRepo,planRepo
  );

// =========================
// CONTROLLER
// =========================
const controller =
  new ControllerTareaMantenimiento(
    service
  );

// =========================
// ROUTER
// =========================
const router = Router();

// ➕ Crear tarea
router.post(
  "/",
  controller.crearTarea
);

// 📋 Obtener todas
router.get(
  "/",
  controller.obtenerTareas
);

// 🔍 Obtener por ID
router.get(
  "/:id",
  controller.obtenerPorId
);

// 🔎 Obtener tareas por plan
router.get(
  "/plan/:planId",
  controller.obtenerPorPlan
);

// ✏️ Actualizar tarea
router.put(
  "/:id",
  controller.actualizarTarea
);

// ❌ Eliminar tarea
router.delete(
  "/:id",
  controller.eliminarTarea
);

export default router;