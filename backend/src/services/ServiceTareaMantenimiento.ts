import { Repository } from "typeorm";
import { TareaMantenimiento } from "../models/TareaMantenimiento";
import { PlanMantenimiento } from "../models/PlanMantenimiento";

export class ServiceTareaMantenimiento {

  constructor(
    private tareaRepo: Repository<TareaMantenimiento>,
    private planRepo: Repository<PlanMantenimiento>
  ) {}

  // =========================
  // Crear tarea
  // =========================
  async crearTarea(data: any) {

    try {

      const plan = await this.planRepo.findOne({
          where: {
            id: data.planId
          },
        });

      if (!plan) {
        throw new Error(
          "Plan no encontrado"
        );
      }

      const tarea = this.tareaRepo.create({

          descripcion:
            data.descripcion,
    

          plan,
        });

      return await this.tareaRepo.save(
        tarea
      );

    } catch (error: any) {

      console.error(
        "ERROR AL CREAR TAREA:",
        error
      );

      throw new Error(
        error.message ||
        "Error al crear tarea"
      );
    }
  }

  // =========================
  // Obtener todas las tareas
  // =========================
  async obtenerTareas() {

    try {

      return await this.tareaRepo.find({

        relations: ["plan"],

        order: {
          id: "DESC",
        },
      });

    } catch (error: any) {

      console.error(
        "ERROR AL OBTENER TAREAS:",
        error
      );

      throw new Error(
        error.message ||
        "Error al obtener tareas"
      );
    }
  }

  // =========================
  // Obtener tarea por id
  // =========================
  async obtenerTareaPorId(
    id: number
  ) {

    try {

      const tarea = await this.tareaRepo.findOne({

          where: { id },

          relations: ["plan"],
        });

      if (!tarea) {
        throw new Error(
          "Tarea no encontrada"
        );
      }

      return tarea;

    } catch (error: any) {

      console.error(
        "ERROR AL OBTENER TAREA:",
        error
      );

      throw new Error(
        error.message ||
        "Error al obtener tarea"
      );
    }
  }

  // =========================
  // Obtener tarea por plan
  // =========================
  async obtenerPorPlan(
    planId: number
  ) {

    try {

      return await this.tareaRepo.find({

        where: {
          plan: {
            id: planId
          },
        },

        relations: ["plan"],

        order: {
          id: "ASC",
        },
      });

    } catch (error: any) {

      console.error(
        "ERROR AL OBTENER TAREAS:",
        error
      );

      throw new Error(
        error.message ||
        "Error al obtener tareas del plan"
      );
    }
  }

  // =========================
  // Actualizar tarea
  // =========================
  async actualizarTarea(
    id: number,
    data: any
  ) {

    try {

      const tarea = await this.tareaRepo.findOne({
          where: { id },
        });

      if (!tarea) {
        throw new Error(
          "Tarea no encontrada"
        );
      }

      tarea.descripcion = data.descripcion ??
        tarea.descripcion;

      return await this.tareaRepo.save(
        tarea
      );

    } catch (error: any) {

      console.error(
        "ERROR AL ACTUALIZAR TAREA:",
        error
      );

      throw new Error(
        error.message ||
        "Error al actualizar tarea"
      );
    }
  }


  async eliminarTarea(id: number) {

  try {

    const tarea = await this.tareaRepo.findOne({
        where: { id },
      });

    if (!tarea) {
      throw new Error(
        "Tarea no encontrada"
      );
    }

    await this.tareaRepo.remove(tarea);

    return {
      mensaje:
        "Tarea eliminada correctamente",
    };

  } catch (error: any) {

    console.error(
      "ERROR AL ELIMINAR TAREA:",
      error
    );

    throw new Error(
      error.message ||
      "Error al eliminar tarea"
    );
  }
}
}