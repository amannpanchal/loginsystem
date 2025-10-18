import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { dashboard } from '../functions';



export default function Dashboard() {
  const [info, setInfo] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function load() {
      if (!token) {
        
        setInfo({ error: 'No token found. Please login.'});
        return;
      }
      try {
        const res = await dashboard(token);
      
        setInfo(res.data);
      } catch (err) {
        setInfo({ error: err?.response?.data?.message || 'Server error' });
      }
    }
    load();
  }, [token]);

  if (!token) {
    return <div><h2>Dashboard</h2><p>Please login to see dashboard.</p></div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {info ? (
        info.error ? <p style={{ color: 'red' }}>{info.error}</p> : (
          <div>
            <p>Welcome, <strong>{info.user?.name || info.user?.email}</strong></p>
            <pre>{JSON.stringify(info.user, null, 2)}</pre>
          </div>
        )
      ) : <p>Loading...</p>}
    </div>
  );
}
