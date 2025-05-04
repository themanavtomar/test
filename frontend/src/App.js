// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', note: ''});
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, note } = formData;
  
    // Simple validations
    if (!name || !email || !note) {
      alert('Please fill in all fields.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      fetchUsers();
      setFormData({ name: '', email: '', note: '' }); // Clear form
    } catch (err) {
      alert('Error adding user');
    }
  };
  ;

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
  <h2 style={{ textAlign: 'center' }}>Register User</h2>
  <form
    onSubmit={handleSubmit}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: '20px',
      borderRadius: '12px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}
  >
    <input
      name="name"
      placeholder="Name"
      onChange={handleChange}
      value={formData.name}
      style={{ padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
      required
    />
    <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
      value={formData.email}
      style={{ padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
      required
    />
    <textarea
      name="note"
      placeholder="Note"
      onChange={handleChange}
      value={formData.note}
      style={{
        padding: '10px',
        fontSize: '16px',
        minHeight: '100px',
        resize: 'vertical',
        borderRadius: '6px',
        border: '1px solid #ccc'
      }}
      required
    />
    <button
      type="submit"
      style={{
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px'
      }}
    >
      Submit
    </button>
  </form>

  <h2 style={{ marginTop: '30px' }}>User List</h2>
  <ul>
    {users.map(user => (
      <li key={user.id} style={{ marginBottom: '10px', lineHeight: '1.4' }}>
        <strong>{user.name}</strong> ({user.email})<br />
        <em>{user.note}</em>
      </li>
    ))}
  </ul>
</div>
  );
}

export default App;