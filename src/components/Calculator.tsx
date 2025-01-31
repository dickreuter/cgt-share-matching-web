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
  const [totalGains, setTotalGains] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaxYear, setSelectedTaxYear] = useState("");
  const [isCorporate, setIsCorporate] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Handle tax year change
  const handleTaxYearChange = (e) => {
    setSelectedTaxYear(e.target.value);
  };

  const handleCorporateChange = (e) => {
    setIsCorporate(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !selectedTaxYear) {
      alert("Please select both a file and a tax year.");
      return;
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;

      // Use regex to split lines, handling both \n and \r\n
      const lines = text.split(/\r?\n/);
      const headers = lines[0].split(",").map(header => header.replace(/(^"|"$)/g, ''));

      // Check for required columns
      const requiredColumns = ["TradeNumber", "Date", "Ticker", "Shares", "Price", "Costs"];
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));

      if (missingColumns.length > 0) {
        alert(`CSV file must contain the following columns: ${requiredColumns.join(", ")}.`);
        return;
      }

      // If valid, proceed with form submission
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("taxYear", selectedTaxYear);
      formData.append("bedAndBreakfastDays", isCorporate ? 10 : 30);

      try {
        const url = `http${HTTP_PREFIX}://${API_URL}/uploadfile/?tax_year=${encodeURIComponent(
          selectedTaxYear
        )}`;
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setData(response.data.results); // Set data for tabulator
        setTotalGains(response.data.total_profit); // Set total gains
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Trigger the file read
    reader.readAsText(file);
  };

  // Define columns and options for ReactTabulator as per your data structure
  const nonEmptyColumns =
    data.length > 0
      ? Object.keys(data[0]).filter((key) =>
          data.some((row) => row[key] !== null && row[key] !== undefined)
        )
      : [];


  const columns = nonEmptyColumns.map((key) => ({
    title: key,
    field: key,
    sorter: "string",
    headerFilter: "input",
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

  // Generate tax year options
  const taxYears = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year > currentYear - 7; year--) {
    taxYears.push(`${year - 1}-${year}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} required />
        <br />
        <br />
        {/* Tax Year Dropdown */}
        <select onChange={handleTaxYearChange} value={selectedTaxYear}>
          <option value="">Select Tax Year</option>
          {taxYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            checked={isCorporate}
            onChange={handleCorporateChange}
          />
           Use corporate method: 10 days for bed and breakfast instead of 30
        </label>
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
          <>
            <CircularProgress />
          </>
        </div>
      ) : data && data.length > 0 ? (
        <div>
          <div className="gains">
            Total gains: <strong>{totalGains}</strong>
          </div>
          <ReactTabulator
            data={data}
            columns={columns}
            options={options}
            key={Date.now()} // Ensuring re-render with new data
          />
        </div>
      ) : (
        <div>No data to display</div>
      )}
    </div>
  );
}

export default MainPage;
