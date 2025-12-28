const { spawn } = require('child_process');
const http = require('http');

// Start the backend server
const server = spawn(process.execPath, ['index.js'], { stdio: 'inherit' });

// Give the server a moment to start
setTimeout(() => {
  http.get('http://localhost:3000/api/hello', (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      try {
        const obj = JSON.parse(data);
        if (obj.message === 'Hello from Express!') {
          console.log('Smoke test passed');
          server.kill();
          process.exit(0);
        } else {
          console.error('Unexpected response:', data);
          server.kill();
          process.exit(1);
        }
      } catch (e) {
        console.error('Invalid JSON:', e);
        server.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Request failed:', err);
    server.kill();
    process.exit(1);
  });
}, 700);
