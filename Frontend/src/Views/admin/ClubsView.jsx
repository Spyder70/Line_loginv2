import React, { useState, useEffect } from 'react';
import axios from "axios";

const styles = {
    table: {
        borderCollapse: 'collapse',
        width: '80%', // Adjust the width as needed
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      },
      th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '14px',
      },
      td: {
        border: '1px solid #ddd',
        padding: '8px',
        color: '#666',
        fontSize: '12px',
      },
};

const ClubsView = () => {
  const id = window.location.pathname;
  const [data, setData] = useState([]);
  useEffect(()=>{
    const getData = async () =>{
      await axios.get(`http://localhost:8080/clubdata${id.slice(11)}`).then(({data})=>setData(data)).catch(err=>console.log(err));
    }
    getData();
    console.log(data)
  },[]);

  return (
    data.length!==0 && <table style={styles.table}>
      <thead>
        <tr>
          {Object.keys(data[0]).map(item=>(
            <th style={styles.th}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {
              Object.values(row).map(item=>(
                <td style={styles.td}>{(typeof item === 'string' && item.substring(0,1) === '{') 
                ? (JSON.parse(item+'}').Start + ' To ' + JSON.parse(item+'}').End) 
                : (typeof item === 'string' && item.substring(0,1) === '[') 
                ? JSON.parse(item).map((e,i)=>(e!=='' ? e+',' : null)) : item} </td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClubsView;