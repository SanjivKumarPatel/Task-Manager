import asyncHandler from '../middleware/asyncHandler.js'
import Task from '../models/Task.js'

export const createTask = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { title, description, deadline, priority, category } = req.body

  if (!title) {
    const error = new Error('Task title is required')
    error.statusCode = 400
    throw error
  }

  const task = await Task.create({
    title,
    description,
    deadline,
    priority,
    category,
    createdBy: userId,
    assignedTo: userId
  })

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task
  })
})

export const getAllTasks = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const tasks = await Task.find({
    $or: [{ createdBy: userId }, { assignedTo: userId }]
  }).sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks
  })
})

export const getTask = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.id

  const task = await Task.findById(taskId)

  if (!task) {
    const error = new Error('Task not found')
    error.statusCode = 404
    throw error
  }

  if (
    task.createdBy.toString() !== userId &&
    task.assignedTo.toString() !== userId
  ) {
    const error = new Error('Not authorized')
    error.statusCode = 403
    throw error
  }

  res.status(200).json({ success: true, task })
})

export const updateTask = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.id

  const task = await Task.findById(taskId)

  if (!task) {
    const error = new Error('Task not found')
    error.statusCode = 404
    throw error
  }

  if (task.createdBy.toString() !== userId) {
    const error = new Error('Not authorized')
    error.statusCode = 403
    throw error
  }

  const { title, description, status, deadline, priority, category } = req.body
  if (title !== undefined) task.title = title
  if (description !== undefined) task.description = description
  if (status !== undefined) task.status = status
  if (deadline !== undefined) task.deadline = deadline
  if (priority !== undefined) task.priority = priority
  if (category !== undefined) task.category = category

  await task.save()

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    task
  })
})

export const deleteTask = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.id

  const task = await Task.findById(taskId)

  if (!task) {
    const error = new Error('Task not found')
    error.statusCode = 404
    throw error
  }

  if (task.createdBy.toString() !== userId) {
    const error = new Error('Not authorized')
    error.statusCode = 403
    throw error
  }

  await task.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  })
})
