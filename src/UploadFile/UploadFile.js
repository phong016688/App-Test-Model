import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Button, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('https://postfile.com:8000/post', formData);
        setUploadStatus(`Upload success. Response: ${JSON.stringify(response.data)}`);
      } catch (error) {
        setUploadStatus(`Upload failed. Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant="h6">Drag and drop or click to select a file</Typography>
            <Typography variant="body1">Only image files are allowed</Typography>
          </div>
        )}
      </Dropzone>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={uploadFile}
        disabled={!file}
      >
        Upload
      </Button>
      {uploadStatus && (
        <Typography variant="body1" color={uploadStatus.includes('failed') ? 'error' : 'primary'}>
          {uploadStatus}
        </Typography>
      )}
    </div>
  );
};

export default UploadFile;