import axios from "axios";

export const obtenerScraping = async () => {
  const options = {
    method: "GET",
    url: "http://127.0.0.1:8000/main_app/api/webscraping/",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    Promise.reject(err);
  }
};

export const obtenerClasificacion = async (titulo) => {
  const options = {
    method: "GET",
    params: { titulo },
    url: "http://127.0.0.1:8000/main_app/api/clasificador/",
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    Promise.reject(err);
  }
};

export const obtenerPrueba = async (titulo) => {
  try {
    const options = {
      method: "GET",
      params: { titulo },
      url: "http://127.0.0.1:8000/main_app/api/generate_pdf/",
      responseType: "arraybuffer",
    };
    const response = await axios(options);

    if (response.status === 200) {
      return new Uint8Array(response.data); // Convierte la respuesta en un array de bytes
    } else {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
