'use client';
import { useEffect, useState } from 'react';

const Home = () => {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/sheet');
      const data = await res.json();
      setRows(data.rows || []);
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
                  backgroundColor: '#4CAF50', // Green header
                  color: '#ffffff', // White text for contrast
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
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    textAlign: 'center',
                    color: '#333333',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;