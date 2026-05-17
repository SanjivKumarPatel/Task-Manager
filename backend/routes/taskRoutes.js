import express from 'express'
import protect from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.use(protect)

taskRouter.post('/', adminMiddleware, createTask)
taskRouter.delete('/:id', adminMiddleware, deleteTask)

taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', getTask)
taskRouter.put('/:id', updateTask)

export default taskRouter
