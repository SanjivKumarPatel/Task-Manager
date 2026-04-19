import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    const error = new Error('All fields are required')
    error.statusCode = 400
    throw error
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim()
  })

  if (existingUser) {
    const error = new Error('User already exists')
    error.statusCode = 409
    throw error
  }

  const user = await User.create({ name, email, password })

  res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: generateToken(user._id),
      user
    })
})
