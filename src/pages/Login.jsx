import React from 'react'
import { login } from '../functions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
      const [form, setForm] = useState({  email: "", password: "" });
      const [message, setMessage] = useState(null);
      const navigate  = useNavigate();
      const [loading, setLoading] = useState(false);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(null);
      setLoading(true);
  
      try {
        const res = await login(form);
        const token = res.data.token;
     
      if (token) {
        localStorage.setItem('token', token);
        setMessage('Login successful. Redirecting to dashboard...');
        setTimeout(() => navigate('/'), 800);
      } else {
        setMessage('Login successful but no token returned.');
      }
      } catch (e) {
        const errMsg = e?.response?.data?.message || "Signup failed";
        setMessage(errMsg);
      } finally {
        setLoading(false);
      }
    };
  


  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
       
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Login........" : "Login"}
        </button>
      </form>

      {message && (
        <p className={`message success`}>{message}</p>
      )}
     
    </div>
  )
}

export default Login