import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/css/tabulator.min.css";
import "react-tabulator/lib/styles.css";
import { API_URL, HTTP_PREFIX } from "../helper/Constants";

import "../views/Main.css";

function MainPage() {
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
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http${HTTP_PREFIX}://${API_URL}/uploadfile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response.data.results); // Set data for tabulator
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define columns and options for ReactTabulator as per your data structure
  const nonEmptyColumns =
    data.length > 0
      ? Object.keys(data[0]).filter((key) =>
          data.some((row) => row[key] !== null && row[key] !== undefined)
        )
      : [];

  const outcomeFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ) => {
    const value = cell.getValue();

    // Set the background color based on the value
    if (value === "WON") {
      cell.getRow().getElement().style.backgroundColor = "lightgreen";
    } else if (value === "LOST") {
      cell.getRow().getElement().style.backgroundColor = "pink"; // Using pink as a light red substitute
    }

    // Return the cell value so it gets displayed
    return value;
  };

  const columns = nonEmptyColumns.map((key) => ({
    title: key,
    field: key,
    sorter: "string",
    headerFilter: "input",
    formatter: key === "betOutcome" ? outcomeFormatter : null,
    formatterParams: {
      target: "_blank",
    },
    cellClick: function (e, cell) {
      // console.log("Cell  clicked - ", cell.getValue())
    },
    cssClass: "custom-cell-style", // Add a custom class to cells in this column
  }));
  const options = {
    pagination: "local",
    paginationSize: 30,
    layout: "fitDataFill",
    initialSort: [{ column: "timestamp", dir: "desc" }],
    columnVertAlign: "top",
    dataTree: true,
    dataTreeStartExpanded: false,
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} required />
        <br />
        <br />
        <input type="submit" value="Upload and Calculate" />
      </form>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
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

export default MainPage;
