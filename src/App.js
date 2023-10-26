import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Bars from "./components/BarsChart";
import jsonData from './data.json';

import "./App.css";
import { obtenerClasificacion, obtenerPrueba, obtenerScraping } from "./utils/api";

function App() {
  const [prueba, setPrueba] = useState([]);
  const [mostrarClasificacion, setMostrarClasificacion] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [charData, setChartData] = useState({});

  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    setChartData(jsonData);
  }, []);

  const scraping = async () => {
    try {
      const response = await obtenerScraping();
      console.log(response);
      setPrueba([1]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchClick = () => {
    searchCategoria(titulo);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
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
      if (resultados == 1){
        setCategoria("Desarrollo y calidad del software")
        setMostrarClasificacion(true)
      } else if (resultados == 2){
        setCategoria("Infraestructura y Operaciones")
        setMostrarClasificacion(true)
      } else if(resultados == 3){
        setCategoria("Especialistas en ciberseguridad")
        setMostrarClasificacion(true)
      } else if (resultados == 4){
        setCategoria("Gestión de datos y bases de datos")
        setMostrarClasificacion(true) 
      } else{
        setCategoria("No se encontró una coincidencia con el titulo ingresado.")
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
      const pdfBlob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${titulo}.pdf`);
      document.body.appendChild(link);
      link.click();
  
      return response; // Puedes devolver los datos adicionales de la API si es necesario
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

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
          </div><br></br>
          {prueba.length > 0 ? (
            <>
              <div className="content-info">
                <Bars/>
                <p>A continuación, en el recuadro de abajo digita el título que deseas</p><br></br>
              </div>
              {mostrarClasificacion === true ? (
                  <>
                    <div className="content-info">
                      <p>El titulo {titulo} lo clasificamos como: {categoria}</p>
                      <button onClick={handleGenerarPruebas} id="btn-scraping">Generar prueba</button>
                    </div><br></br>
                    <div className="content-info">
                      {/* <PDFViewer/> */}
                    </div>
                  </>
                ):null}
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
                      value={titulo}
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
        </div>
      </section>
    </>
  );
}

export default App;
