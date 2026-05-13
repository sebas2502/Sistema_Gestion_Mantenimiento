import api from "./api";

export const ejecutarAnalisis = async (activoId) => {
  try {
    const res = await api.post(`/analisis/${activoId}`
    );

    return res.data; 
  } catch (error) {
    console.error("ERROR BACK:", error.response?.data);

    throw new Error(
      error.response?.data?.error || "Error al ejecutar análisis"
    );
  }
};