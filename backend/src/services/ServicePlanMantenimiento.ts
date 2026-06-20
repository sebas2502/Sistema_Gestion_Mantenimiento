import { Repository } from "typeorm";
import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { ServiceOrdenTrabajo } from "./ServiceOrdenTrabajo";

export class ServicePlanMantenimiento {
  constructor(
    private planRepo: Repository<PlanMantenimiento>,
    private ordenService: ServiceOrdenTrabajo
  ) {}

  // =========================
  //  Ejecutar planes preventivos
  // =========================
  async ejecutarPlanesPreventivos() {
    try {
      const planes = await this.planRepo.find({
        where: { estaActivo: true },
        relations: ["activo", "tareas"],
      });

      const hoy = new Date();

      const resultados = [];

      for (const plan of planes) {

        // Si nunca se ejecutó
        const ultima = plan.fechaUltimaEjecucion || new Date(0);

        const diasDesdeUltima =
          (hoy.getTime() - ultima.getTime()) /
          (1000 * 60 * 60 * 24);

        // Verificar frecuencia
 
        if (diasDesdeUltima >= plan.frecuenciaDias) {
      
          // Evitar órdenes duplicadas
          const yaExiste = await this.ordenService.existeOrdenPreventivaAbierta(plan.id);

          if (yaExiste) {

            resultados.push({
              planId: plan.id,
              activo: plan.activo?.nombre || "N/A",
              mensaje: "Ya existe una orden preventiva abierta",
            });

            continue;
          }

          // Crear orden preventiva
          const orden = await this.ordenService.crearPreventivaDesdePlan(plan);

          // Actualizar fecha ejecución
          await this.planRepo
            .createQueryBuilder()
            .update()
            .set({
              fechaUltimaEjecucion: hoy,
            })
            .where("id = :id", {
              id: plan.id,
            })
            .execute();

          resultados.push({
            planId: plan.id,
            ordenId: orden.id,
            activo:
              plan.activo?.nombre || "N/A",
            diasDesdeUltimaEjecucion:
              Math.floor(diasDesdeUltima),
            mensaje:
              "Orden preventiva generada",
          });
        }
      }

      return resultados;

    } catch (error: any) {

      console.error(
        "ERROR EN SERVICE PREVENTIVO:",
        error
      );

      throw new Error(
        error.message ||
        "Error al ejecutar planes preventivos"
      );
    }
  }

  // =========================
  // Obtener planes
  // =========================
  async obtenerPlanes() {
    try {

      return await this.planRepo.find({
        relations: ["activo", "tareas"],
      });

    } catch (error: any) {

      console.error(
        "ERROR AL OBTENER PLANES:",
        error
      );

      throw new Error(
        error.message ||
        "Error al obtener planes"
      );
    }
  }

  // =========================
  // Crear plan
  // =========================
  async crearPlan(data: any) {
    try {

      const plan = this.planRepo.create({
        descripcion: data.descripcion,
        frecuenciaDias: data.frecuenciaDias,
        estaActivo: true,
        activo: data.activo,
        tareas: data.tareas || [],
      });

      return await this.planRepo.save(plan);

    } catch (error: any) {

      console.error(
        "ERROR AL CREAR PLAN:",
        error
      );

      throw new Error(
        error.message ||
        "Error al crear plan"
      );
    }
  }

  // =========================
  // Actualizar plan
  // =========================
  async actualizarPlan(
    id: number,
    data: any
  ) {
    try {

      const plan =
        await this.planRepo.findOne({
          where: { id },
          relations: ["activo", "tareas"],
        });

      if (!plan) {
        throw new Error("Plan no encontrado");
      }

      plan.descripcion =
        data.descripcion ??
        plan.descripcion;

      plan.frecuenciaDias =
        data.frecuenciaDias ??
        plan.frecuenciaDias;

      if (data.activo) {
        plan.activo = data.activo;
      }

      return await this.planRepo.save(plan);

    } catch (error: any) {

      console.error(
        "ERROR AL ACTUALIZAR PLAN:",
        error
      );

      throw new Error(
        error.message ||
        "Error al actualizar plan"
      );
    }
  }

  // =========================
  // Desactivar plan
  // =========================
  async desactivarPlan(id: number) {
    try {

      const plan =
        await this.planRepo.findOne({
          where: { id },
        });

      if (!plan) {
        throw new Error("Plan no encontrado");
      }

      plan.estaActivo = false;

      return await this.planRepo.save(plan);

    } catch (error: any) {

      console.error(
        "ERROR AL DESACTIVAR PLAN:",
        error
      );

      throw new Error(
        error.message ||
        "Error al desactivar plan"
      );
    }
  }

  // =========================
  // Obtener plan por id
  // =========================
  async obtenerPorId(id: number) {
    try {

      const plan =
        await this.planRepo.findOne({
          where: { id },
          relations: ["activo", "tareas"],
        });

      if (!plan) {
        throw new Error("Plan no encontrado");
      }

      return plan;

    } catch (error: any) {

      console.error(
        "ERROR AL OBTENER PLAN:",
        error
      );

      throw new Error(
        error.message ||
        "Error al obtener plan"
      );
    }
  }
}