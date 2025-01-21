Capital Gains Tax Calculator
============================

Visit www.cgt-share-matching.co.uk

Welcome to the automatic Capital Gains Tax Calculator. This tool helps you calculate the capital gains taxes on your share dealings based on UK tax rules. Simply upload a CSV file with your transaction details, and the calculator will apply the appropriate tax rules to compute your gains or losses.

CSV File Format
---------------

Your CSV file must contain the following columns:

- **Date:** The date of the transaction (format: YYYY-MM-DD).
- **Ticker:** Ticker or unique name of the security.
- **Shares:** Number of shares traded. For sales, the number has to be negative.
- **Price:** Price per share.
- **Costs:** Associated costs (e.g., broker fees).

Example::

    Date,Ticker,Shares,Price,Costs
    2024-01-01,msft,buy,100,10.0,1.0
    2024-01-02,msft,sell,50,12.0,0.0
    ...

Applied Rules
-------------

This calculator applies the following rules:

- **Same-Day Rule:** Matches sales with purchases made on the same day.
- **Bed and Breakfasting Rule:** Matches sales with re-purchases within 30 days after the sale.
- **Section 104 Holding:** For sales not matched by the above rules, uses the average cost of shares in the pool.
