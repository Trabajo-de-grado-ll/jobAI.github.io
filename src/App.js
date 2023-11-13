import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import jsonData from "./data.json";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.css";
import {
  obtenerClasificacion,
  obtenerPrueba,
  obtenerScraping,
} from "./utils/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var misoptions = {
  responsive: true,
  animation: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 15,
    },
    x: {
      ticks: { color: "black" },
    },
  },
};

function App() {
  const [prueba, setPrueba] = useState(false);
  const [mostrarClasificacion, setMostrarClasificacion] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [charData, setChartData] = useState({});
  const [inputJson, setInputJson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChartData(jsonData);
  }, []);

  const scraping = async () => {
    setLoading(true);
    try {
      const response = await obtenerScraping();
      console.log(response);
      setInputJson(response || {}); // Manejar el caso en que response sea undefined o null
      console.log(inputJson);
      setPrueba(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setPrueba(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(inputJson);
  }, [inputJson]);

  const handleSearchClick = () => {
    searchCategoria(titulo);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchCategoria(titulo);
    }
  };

  const handleInputChange = (event) => {
    setTitulo(event.target.value);
  };

  const searchCategoria = async (titulo) => {
    console.log(titulo);
    try {
      const response = await obtenerClasificacion(titulo);
      const resultados = response.resultados;
      console.log(resultados);
      if (resultados === 1) {
        setCategoria("Desarrollo y calidad del software");
        setMostrarClasificacion(true);
      } else if (resultados === 2) {
        setCategoria("Infraestructura y Operaciones");
        setMostrarClasificacion(true);
      } else if (resultados === 3) {
        setCategoria("Gestión de datos y bases de datos");
        setMostrarClasificacion(true);
      } else if (resultados === 4) {
        setCategoria("Especialistas en ciberseguridad");
        setMostrarClasificacion(true);
      } else {
        setCategoria(
          "No se encontró una coincidencia con el título ingresado."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerarPruebas = async () => {
    console.log(titulo);
    try {
      // Realiza la solicitud a la API con el título
      const response = await obtenerPrueba(titulo);

      // Genera el enlace de descarga si la solicitud tiene éxito
      const pdfBlob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${titulo}.pdf`);
      document.body.appendChild(link);
      link.click();

      return response; // Puedes devolver los datos adicionales de la API si es necesario
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const labels = Object.values(inputJson.titulo || {}); // Manejar el caso en que inputJson.titulo sea undefined o null
  console.log("labels", labels);

  const data = Object.values(inputJson.cantidad || {}); // Manejar el caso en que inputJson.cantidad sea undefined o null
  console.log("dataa", data);

  const transformedJson = {
    labels: labels,
    datasets: [
      {
        label: "Solicitudes",
        data: data,
        backgroundColor: "red",
      },
    ],
  };

  return (
    <>
      <section className="main">
        <div className="content-main">
          <div className="content-info">
            <h1>JobAI</h1>
            <h3>
              La inteligencia artificial para pruebas técnicas automatizadas.
            </h3>
            <p>
              Para comenzar, haz clic en el botón para hacer el web scraping.
            </p>
            <button id="btn-scraping" onClick={scraping}>
              Comenzar web scraping
            </button>
          </div>
          <br></br>
          {loading ? (
            <div className="content-info">
              <p>
                <p>Generando web scraping</p>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </p>
            </div>
          ) : (
            <>
              {prueba ? (
                <>
                  <div className="content-info">
                    <Bar data={transformedJson} options={misoptions} />
                    <p>
                      A continuación, en el recuadro de abajo digita el título
                      que deseas
                    </p>
                    <br></br>
                  </div>
                  {mostrarClasificacion === true ? (
                    <>
                      <div className="content-info">
                        <p>
                          El titulo {titulo} lo clasificamos como: {categoria}
                        </p>
                        <button
                          onClick={handleGenerarPruebas}
                          id="btn-scraping"
                        >
                          Generar prueba
                        </button>
                      </div>
                      <br></br>
                      <div className="content-info">{/* <PDFViewer/> */}</div>
                    </>
                  ) : null}
                  <div className="content-input">
                    <div className="text-input">
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "100%" },
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          type="text"
                          onKeyPress={handleKeyPress}
                          onChange={handleInputChange}
                          placeholder="Escribe el título"
                          variant="filled"
                        />
                      </Box>
                    </div>
                    <div className="boton-text-input">
                      <button onClick={handleSearchClick}>></button>
                    </div>
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
