const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

let history = require('connect-history-api-fallback')

let app = express()
app.use(history()) // HTML5 History Mode middleware
app.use(serveStatic(path.join(__dirname, 'dist')))
const port = process.env.PORT || 80
app.listen(port)
