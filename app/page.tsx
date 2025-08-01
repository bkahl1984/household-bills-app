'use client';
import { useEffect, useState } from 'react';

const Home = () => {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Replace this with your public Google Sheets JSON endpoint:
        const sheetId = '1--pNuKjUSUGI_Uhbh-fC4KzZKpulLJcIsFotFoQ29Wc';
        const range = 'Expenses';
        const apiKey = 'AIzaSyBI6lbOHxGCgTYSlAO4gSH5g6BgxNAlboU';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        console.log('Fetched data:', data);

        setRows(data.values || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (rows.length === 0) return <p>Loading...</p>;

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Monthly Utilities Overview</h1>
      
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  backgroundColor: '#4CAF50',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
              {row.map((cell, cellIndex) => {
                const nextRow = dataRows[rowIndex + 1];
                let nextValue = 0;
                
                if (nextRow && cellIndex > 0) {
                  const currentNumber = parseFloat(cell.replace(/[^0-9.]/g, '')) || 0;
                  const nextNumber = parseFloat(nextRow[cellIndex].replace(/[^0-9.]/g, '')) || 0;
                  nextValue = currentNumber - nextNumber;
                }

                const nextValueFixed = nextValue.toFixed(2);

                return (
                  <td
                    key={cellIndex}
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      textAlign: 'center',
                      color: '#333333',
                    }}
                  >
                    {cellIndex === 0 && cell}
                    {cellIndex > 0 && nextRow !== undefined && cell !== 'NaN' &&
                      <span>
                        {cell} <span style={{
                          color: nextValueFixed.includes('-') || nextValueFixed === "0.00" ? 'green' : 'red',
                          fontWeight: 'bold'
                        }}>
                          {nextValueFixed.includes('-') || nextValueFixed === "0.00" ? '' : '+'}
                          {nextValueFixed}
                        </span>
                      </span>
                    }
                    {cellIndex > 0 && nextRow === undefined && cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;