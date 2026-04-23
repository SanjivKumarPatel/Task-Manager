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

const teamRouter = express.Router()

teamRouter.use(protect)

teamRouter.route('/').post(createTeam).get(getAllTeams)
teamRouter.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam)
teamRouter.post('/:id/members', addMember)
teamRouter.delete('/:id/members/:memberId', removeMember)

export default teamRouter
