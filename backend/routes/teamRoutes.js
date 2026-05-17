import express from 'express'
import protect from '../middleware/authMiddleware.js'
import {
  createTeam,
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember
} from '../controllers/teamController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const teamRouter = express.Router()

teamRouter.use(protect)

teamRouter.get('/', getAllTeams)
teamRouter.get('/:id', getTeam)

teamRouter.post('/', adminMiddleware, createTeam)
teamRouter.put('/:id', adminMiddleware, updateTeam)
teamRouter.put('/:id', adminMiddleware, deleteTeam)
teamRouter.put('/:id/members', adminMiddleware, addMember)
teamRouter.put('/:id/members/:memberId', adminMiddleware, removeMember)

export default teamRouter
