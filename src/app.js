import express from 'express'
import farmaciaRoutes from './routes/farmacia.routes.js'

const app = express()

app.use(express.json())
app.use('/api/',farmaciaRoutes) 


app.use((req, res, next) => {
  res.status(404).json({
    message: 'No existe el endpoint'
  })
})

export default app