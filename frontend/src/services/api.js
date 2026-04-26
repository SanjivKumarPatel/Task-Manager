import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

/* Request Interceptor */
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
    }

    return config
  },
  (error) => Promise.reject(error)
)

/*Wrapper Object */
const api = {
  get: (url, config) => apiInstance.get(url, config),
  post: (url, data, config) => apiInstance.post(url, data, config),
  put: (url, data, config) => apiInstance.put(url, data, config),
  delete: (url, config) => apiInstance.delete(url, config)
}

export const authApi = {
  registerUser: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),

  loginUser: (email, password) => api.post('/auth/login', { email, password }),

  getProfile: () => api.get('/auth/profile')
}

export const taskApi = {
  createTask: (title, description, deadline, assignedTo) =>
    api.post('/tasks', { title, description, deadline, assignedTo }),

  getAllTasks: () => api.get('/tasks'),

  getTask: (taskId) => api.get(`/tasks/${taskId}`),

  updateTask: (taskId, title, description, deadline, assignedTo, status) =>
    api.put(`/tasks/${taskId}`, {
      title,
      description,
      deadline,
      assignedTo,
      status
    }),

  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`)
}

export const teamApi = {
  createTeam: (name, description) => api.post('/teams', { name, description }),

  getAllTeams: () => api.get('/teams'),
  getTeam: (teamId) => api.get(`/teams/${teamId}`),

  updateTeam: (teamId, name, description, status) =>
    api.put(`/teams/${teamId}`, { name, description, status }),

  deleteTeam: (teamId) => api.delete(`/teams/${teamId}`),

  addMember: (teamId, memberId) =>
    api.post(`/teams/${teamId}/members`, { memberId }),

  removeMember: (teamId, memberId) =>
    api.delete(`/teams/${teamId}/members/${memberId}`)
}

export const notificationApi = {
  getAllNotification: () => api.get('/notifications'),

  getNotification: (notificationId) =>
    api.get(`/notifications/${notificationId}`),

  markAsRead: (notificationId) =>
    api.put(`/notifications/${notificationId}/read`),

  markAllAsRead: () => api.put(`/notifications/mark-all-read`),

  deleteNotification: (notificationId) =>
    api.delete(`/notifications/${notificationId}`)
}

export default api
