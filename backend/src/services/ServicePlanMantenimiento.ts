import { Repository } from "typeorm";
import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { ServiceOrdenTrabajo } from "./ServiceOrdenTrabajo";

export class ServicePlanMantenimiento {
  constructor(
    private planRepo: Repository<PlanMantenimiento>,
    private ordenService: ServiceOrdenTrabajo
  ) {}

  // =========================
  // 🟡 EJECUTAR PREVENTIVOS
  // =========================
  async ejecutarPlanesPreventivos() {
    try {
      const planes = await this.planRepo.find({
        where: { estaActivo: true }, // ✅ FIX correcto
        relations: ["activo", "tareas"],
      });

      const hoy = new Date();
      const resultados = [];

      for (const plan of planes) {
        // 🔥 Manejo seguro de fecha
        const ultima = plan.fechaUltimaEjecucion || new Date(0);

        const diasDesdeUltima =
          (hoy.getTime() - ultima.getTime()) /
          (1000 * 60 * 60 * 24);

       if (diasDesdeUltima >= plan.frecuenciaDias) {

  const orden =
    await this.ordenService.crearPreventivaDesdePlan(plan);

  await this.planRepo
    .createQueryBuilder()
    .update()
    .set({ fechaUltimaEjecucion: hoy })
    .where("id = :id", { id: plan.id })
    .execute();

  resultados.push({
    planId: plan.id,
    ordenId: orden.id,
    diasDesdeUltimaEjecucion: Math.floor(diasDesdeUltima),
    activo: plan.activo?.nombre || "N/A",
  });
}
      }

      return resultados;
    } catch (error: any) {
      console.error("ERROR EN SERVICE PREVENTIVO:", error);
      throw new Error(error.message || "Error al ejecutar planes preventivos");
    }
  }

  // =========================
  // 📋 OBTENER PLANES
  // =========================
  async obtenerPlanes() {
    try {
      return await this.planRepo.find({
        relations: ["activo", "tareas"],
      });
    } catch (error: any) {
      console.error("ERROR AL OBTENER PLANES:", error);
      throw new Error(error.message || "Error al obtener planes");
    }
  }
}