const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// basic API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' })
})

// (Optional) Serve static built frontend if present
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')))

// fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Express backend listening on http://localhost:${port}`)
})