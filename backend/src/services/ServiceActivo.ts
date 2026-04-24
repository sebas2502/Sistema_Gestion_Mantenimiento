import { Repository } from "typeorm";
import { Activo } from "../models/Activo";

export class ServiceActivo {
  constructor(private activoRepo: Repository<Activo>) {}

  // =========================
  // 📋 OBTENER TODOS
  // =========================
  async obtenerActivos(): Promise<Activo[]> {
    return await this.activoRepo.find({
      order: {
        nombre: "ASC",
      },
    });
  }

  // =========================
  // 🔍 POR ID
  // =========================
  async obtenerActivoPorId(id: number): Promise<Activo | null> {
    return await this.activoRepo.findOne({
      where: { id },
    });
  }

  // =========================
  // ➕ CREAR (opcional ahora)
  // =========================
  async crearActivo(data: Partial<Activo>): Promise<Activo> {
    const activo = this.activoRepo.create(data);
    return await this.activoRepo.save(activo);
  }
}