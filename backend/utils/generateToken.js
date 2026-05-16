import jwt from 'jsonwebtoken'

const generateToken = (id, expiresIn = '7d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn
  })
}

export default generateToken
