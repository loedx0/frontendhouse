import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [response, setResponse] = useState(null);
  const API_BASE_URL = 'https://watermelon-eyes.herokuapp.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`${API_BASE_URL}/api/boiler`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        //"Content-Type": "application/json",
        },
        params: {
          address,
          zipcode
        }
      });
      setResponse(result.data.r);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>House Canary Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;