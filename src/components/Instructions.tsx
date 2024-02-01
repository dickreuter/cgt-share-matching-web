import '../views/Main.css';

function Instructions() {
  return (
    <div className="info">
      <h4>CSV File Format:</h4>
      <p>Your CSV file must contain the following columns:</p>
      <ul>
        <li><strong>Date:</strong> The date of the transaction (format: YYYY-MM-DD).</li>
        <li><strong>Ticker:</strong> Ticker or unique name of the security.</li>
        <li><strong>Shares:</strong> Number of shares traded. For sales, the number has to be negative. Also use this column for positions held in the previous tax year, that are not yet closed. Short positions should have negative numbers.</li>
        <li><strong>Price:</strong> Price per share.</li>
        <li><strong>Costs:</strong> Associated costs (e.g., broker fees). Use only positive numbers for the cost.</li>
      </ul>
      <p>Example:</p>
      <pre>
        Date,Ticker,Shares,Price,Costs<br/>
        2024-01-01,msft,buy,100,10.0,1.0<br/>
        2024-01-02,msft,sell,50,12.0,0.0<br/>
        ...
      </pre>
      {/* Download Link */}
      <a href="/template.csv" download="template.csv">
        Download CSV Template
      </a>

      <br/><br/><br/>
      <h4>Applied Rules:</h4>
      <p>This calculator applies the following rules:</p>
      <ul>
        <li><strong>Same-Day Rule:</strong> Matches sales with purchases made on the same day during the tax year.</li>
        <li><strong>Bed and Breakfasting Rule:</strong> Matches sales with re-purchases within 30 days after the sale. Backward matching between 30 days after tax year ends to the beginning of the tax year.</li>
        <li><strong>Section 104 Holding:</strong> For sales not matched by the above rules, uses the weighted average cost of shares in the pool.</li>
      </ul>

      Each year needs to be processed separately and any unclosed positions from previous years need to be included in the csv file in order for the Section 104 holdings rule to be applied. Any open long positions need to have a positive value in the Shares column. Short positions need to have a negative value.
    </div>
  );
}

export default Instructions;
