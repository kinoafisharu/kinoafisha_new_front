const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

let history_mode = require('connect-history-api-fallback')

let app = express()
app.use(history_mode()) // HTML5 History Mode middleware
app.use(serveStatic(path.join(__dirname, 'dist')))
const port = process.env.PORT || 80
app.listen(port)
