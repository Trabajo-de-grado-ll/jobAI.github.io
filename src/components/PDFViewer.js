import React, { useState } from 'react';
import axios from 'axios';

function PDFViewer() {
  const [pdfUrl, setPdfUrl] = useState('');

  const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/upload-pdf/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);

      setPdfUrl(`/media/pdfs/${file.name}`);
    } catch (error) {
      console.error('Error al cargar el PDF', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadPDF(file);
  };

  return (
    <div>
      <h1>Visor de PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {pdfUrl && (
        <object data={pdfUrl} type="application/pdf" width="100%" height="500">
          <p>No se puede mostrar el PDF. Puedes descargarlo <a href={pdfUrl}>aquí</a>.</p>
        </object>
      )}
    </div>
  );
}

export default PDFViewer;
