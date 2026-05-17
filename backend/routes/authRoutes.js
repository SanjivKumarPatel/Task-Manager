import express from 'express'
import { registerUser, loginUser, getProfile, forgotPassword, verifyOtp, resetPassword } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/profile', protect, getProfile)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/verify-otp', verifyOtp)
authRouter.post('/reset-password', resetPassword)

export default authRouter
