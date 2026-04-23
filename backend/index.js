import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dns from 'dns'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import teamRoutes from './routes/teamRoutes.js'

import errorMiddleware from './middleware/errorMiddleware.js'

dns.setDefaultResultOrder('ipv4first')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/teams', teamRoutes)

app.get('/', (req, res) => {
  res.send('🚀 TaskNova API running')
})

app.use(errorMiddleware)

const startServer = async () =>{
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch(error) {
      console.error(error.message)
      process.exit(1)
  }
}

startServer()