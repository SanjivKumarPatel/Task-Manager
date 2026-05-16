import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      const userData = JSON.parse(storedUser)
      setToken(storedToken)
      setUser(userData)
      setIsLoggedIn(true)
      setLoading(false)
    } else {
    setLoading(false)
    }
  }, [])

  const register = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    setIsLoggedIn(true)
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const login = (userData, userToken, rememberToken = null) => {
    setUser(userData)
    setToken(userToken)
    setIsLoggedIn(true)
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))

    if (rememberToken) {
      localStorage.setItem('rememberToken', rememberToken)
      localStorage.setItem('rememberEnabled', 'true')
    }
  }

  const updateUser = (updateUserData) => {
    setUser(updateUserData)
    localStorage.setItem('user', JSON.stringify(updateUserData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('rememberToken')
    localStorage.removeItem('rememberEnabled')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        register,
        isLoggedIn,
        login,
        updateUser,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

