import express from 'express'
import dotenv from 'dotenv'
import dns from 'dns'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import connectDB from './config/db.js'
import errorMiddleware from './middleware/errorMiddleware.js'

dns.setDefaultResultOrder('ipv4first')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3001

(async () => {
  await connectDB()

  app.get('/task', (req, res) => {
    res.send('Task Route Working')
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  
})()
