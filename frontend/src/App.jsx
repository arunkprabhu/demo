import React, { useState, useEffect } from 'react';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((res) => res.json())
      .then((data) => setMessage(data?.message ?? 'No message'))
      .catch(() => setMessage('Error fetching message'));
  }, []);

  return <h1>{message}</h1>;
}
