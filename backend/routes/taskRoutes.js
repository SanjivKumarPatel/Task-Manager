import express from 'express'
import protect from '../middleware/authMiddleware.js'
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.use(protect)

taskRouter.route('/').post(createTask).get(getAllTasks)

taskRouter.route('/:id').get(getTask).put(updateTask).delete(deleteTask)

export default taskRouter
