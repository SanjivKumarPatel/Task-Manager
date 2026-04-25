import express from 'express'
import protect from '../middleware/authMiddleware.js'
import {
  createNotification,
  getAllNotifications,
  getNotification,
  updateNotification,
  markAllAsRead,
  markAsRead,
  deleteNotification
} from '../controllers/notificationController.js'

const notificationRouter = express.Router()

notificationRouter.use(protect)

notificationRouter.route('/').post(createNotification).get(getAllNotifications)
notificationRouter.put('/mark-all-read', markAllAsRead)
notificationRouter
  .route('/:id')
  .get(getNotification)
  .put(updateNotification)
  .delete(deleteNotification)
notificationRouter.put('/:id/read', markAsRead)

export default notificationRouter
