import React, { useState } from 'react';
import axios from 'axios';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import CircularProgress from '@mui/material/CircularProgress';
import { API_URL, HTTP_PREFIX } from '../helper/Constants';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http${HTTP_PREFIX}://${API_URL}/uploadfile/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setData(response.data.results); // Set data for tabulator
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define columns and options for ReactTabulator as per your data structure
  const columns = [
    { title: "Date", field: "Date", formatter: (cell) => new Date(cell.getValue()).toLocaleDateString() },
    // ... other columns as per your data
  ];
  const options = {
    // ... your options
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} required />
        <br /><br />
        <input type="submit" value="Upload and Calculate" />
      </form>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : data && data.length > 0 ? (
        <ReactTabulator
          data={data}
          columns={columns}
          options={options}
          key={Date.now()} // Ensuring re-render with new data
        />
      ) : (
        <div>No data to display</div>
      )}
    </div>
  );
}

export default FileUpload;
