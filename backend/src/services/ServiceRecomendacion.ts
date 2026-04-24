import { Analisis } from "../models/Analisis";

export class ServiceRecomendacion {
  generarSugerencias(analisis: Analisis): string[] {
    const sugerencias: string[] = [];

    if (analisis.mtbf < 50) {
      sugerencias.push("Revisar componentes críticos del activo");
    }

    if (analisis.tendencia === "AUMENTO_DE_FALLAS") {
      sugerencias.push("Se recomienda programar mantenimiento preventivo urgente");
    }

    if (analisis.frecuenciaFallos > 0.5) {
      sugerencias.push("Se recomienda aumentar frecuencia de inspecciones");
    }

     if (
      analisis.tendencia === "ESTABLE" &&
      analisis.mtbf > 100
    ) {
      sugerencias.push("Mantener estrategia de mantenimiento actual");
    }

    return sugerencias;
  }
}