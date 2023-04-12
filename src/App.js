import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileDrop = (files) => {
    const file = files[0];

    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
  };

  const uploadFile = async () => {
    const file = selectedFile;
    if (file) {
      const formData = new FormData();
      formData.append('video_file', file);
      try {
        setResult('Uploading');
        const response = await axios.post('http://nhamcotdo.ddnsking.com:8000/LSTM', formData);
        setResult(`${JSON.stringify(response.data)}`);
      } catch (error) {
        setResult(`${error.message}`);
      }
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleFileDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button>Choose file</button>
          </div>
        )}
      </Dropzone>

    {selectedFile && (
    <div>
      <p>Selected file: {selectedFile.name}</p>
      <video src={previewUrl} controls />
      <br/>
      <button onClick={uploadFile}>Upload</button>
      <p id='result'>Result: {result}</p>
    </div>
    )}
    </div>
  );
}

export default App;
