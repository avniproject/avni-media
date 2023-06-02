const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

// const dev = process.env.NODE_ENV !== 'production'
const dev = true;
const app = next({ dev })
const handle = app.getRequestHandler()

const apiProxy = createProxyMiddleware('/api', {
    target: 'https://staging.avniproject.org',
    changeOrigin: true,
    secure: false
  });

console.log('---- apiProxy---', apiProxy);

app.prepare().then(() => {
  const server = express()
    console.log("request is coming ......")
  server.use('/', apiProxy)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
