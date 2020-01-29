import express from 'express'
import serveStatic from "serve-static"
import path from 'path'
import history from "connect-history-api-fallback"

let app = express()
app.use(history()) // HTML5 History Mode middleware
app.use(serveStatic(path.join(__dirname, 'dist')))
const port = process.env.PORT || 80
app.listen(port)
