import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  const [prueba, setPrueba] = React.useState([]);

  const [titulo, setTitulo] = React.useState('');

  const [categoria, setCategoria] = React.useState('');

  const scraping = () => {
    setPrueba([1]); // Actualiza el estado de prueba con un valor no vacío
  };

  const send = () => {
    console.log(titulo);
    setCategoria('desarrollador')
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log(titulo);
      setCategoria('desarrollador')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se redirija y recargue
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
          </div><br></br>
          {prueba.length > 0 ? (
            <>
              <div className="content-info">
                <p>A continuación, en el recuadro de abajo digita el título que deseas</p><br></br>
              </div>
              {categoria.length > 0 ? (
                  <>
                    <div className="content-info">
                      <p>El titulo {titulo} lo clasificamos como: {categoria}</p>
                      <button id="btn-scraping">Generar prueba</button>
                    </div><br></br>
                    <div className="content-info">
                      <iframe srcDoc="
                        <p>este es el iframe</p>
                      ">
                      </iframe>
                      <iframe srcDoc="
                        <p>este es el iframe</p>
                      ">
                      </iframe>
                      <iframe srcDoc="
                        <p>este es el iframe</p>
                      ">
                      </iframe>
                      <iframe srcDoc="
                        <p>este es el iframe</p>
                      ">
                      </iframe>
                    </div>
                  </>
                ):null}
              <div className="content-input">
                <div className="text-input">
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "100%" },
                    }}
                  >
                    <TextField
                      id="standard-basic"
                      type="text"
                      value={titulo}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Escribe el título"
                      variant="filled"
                    />
                  </Box>
                </div>
                <div className="boton-text-input">
                  <button onClick={send}>></button>
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
