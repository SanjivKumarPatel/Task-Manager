import { useEffect, useState, useContext } from 'react'
import { taskApi } from '../services/api'
import dashboardBg from '../assets/dashboard-bg.jpg'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'

function Dashboard() {
  const { user } = useContext(AuthContext) || {}
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setError('')
      setLoading(true)
      const res = await taskApi.getAllTasks()
      setTasks(res.data.tasks || [])
    } catch (err) {
      console.error('Failed to load tasks:', err)
      setError('Failed to load tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  //Stats
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'completed').length
  const pending = tasks.filter((t) => t.status !== 'completed').length

  return (
    <div className='w-full min-h-screen bg-slate-900 text-white'>
      {/* Hero */}
      <div
        className='h-[340px] bg-cover bg-center flex items-center px-10 relative'
        style={{ backgroundImage: `url(${dashboardBg})` }}
      >
        <div className='absolute inset-0 bg-black/60'></div>

        <div className='relative z-10'>
          <h1 className='text-4xl font-bold'>
            Welcome back,
            <span className='text-indigo-400 ml-2'>{user?.name || 'User'}</span>
          </h1>

          <p className='text-gray-300 mt-3 max-w-xl'>
            Organize your tasks, collaborate with your team, and achieve more
            every day.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className='px-10 -mt-20 pb-10'>
        {error && (
          <div className='bg-red-100 text-red-700 px-4 py-2 rounded mb-6'>
            {error}
          </div>
        )}

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg'>
            <p className='text-gray-300 text-sm'>Total tasks</p>
            <h2 className='text-2xl font-bold mt-2'>{total}</h2>
          </div>

          <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg'>
            <p className='text-gray-300 text-sm'>Completed</p>
            <h2 className='text-2xl font-bold mt-2 text-green-400'>
              {completed}
            </h2>
          </div>

          <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg'>
            <p className='text-gray-300 text-sm'>Pending</p>
            <h2 className='text-2xl font-bold mt-2 text-yellow-400'>
              {pending}
            </h2>
          </div>
        </div>

        {/* Task List */}
        <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg'>
          <h2 className='text-lg font-semibold mb-4'>Recent Tasks</h2>

          {loading ? (
            <Loader />
          ) : tasks.length === 0 ? (
            <p className='text-gray-400'>No tasks found</p>
          ) : (
            <div className='space-y-4'>
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task._id}
                  className='flex justify-between items-center border-b border-white/10 pb-3'
                >
                  <div>
                    <p className='font-medium'>{task.title}</p>
                    <p className='text-sm text-gray-400'>
                      {task.description || 'No description'}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      task.status === 'completed'
                        ? 'text-green-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {task.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
