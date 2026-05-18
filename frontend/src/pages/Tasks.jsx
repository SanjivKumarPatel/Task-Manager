import { useContext, useEffect, useState } from 'react'
import { Plus, Trash2, ClipboardList } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { taskApi } from '../services/api.js'
import Loader from '../components/Loader.jsx'
import TaskForm from '../components/TaskForm'

function Tasks() {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showTaskForm, setShowTaskForm] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await taskApi.getAllTasks()
      setTasks(res.data.tasks || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev])
    setShowTaskForm(false)
  }

  const handleDelete = async (taskId) => {
    try {
      await taskApi.deleteTask(taskId)

      setTasks((prev) => prev.filter((task) => task._id !== taskId))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task')
    }
  }

  const handleStatusChange = async (taskId, status) => {
    try {
      const task = tasks.find((t) => t._id === taskId)

      const res = await taskApi.updateTask(
        taskId,
        task.title,
        task.description,
        task.deadline,
        task.priority,
        task.category,
        status
      )

      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? res.data.task : t))
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status')
    }
  }

  return (
    <div className='w-full'>
      {/* header */}
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Tasks</h1>
          <p className='mt-2 text-slate-500'>
            Organize and manage your workflow.
          </p>
        </div>

        {user?.role === 'admin' && !showTaskForm && (
          <button
            onClick={() => setShowTaskForm(true)}
            className='flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700'
          >
            <Plus size={18} /> Create Task
          </button>
        )}
      </div>

      {/* error */}
      {error && (
        <div className='mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      {/* TaskForm Modal */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {/* loading */}
      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        /* empty state */
        <div className='rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
            <ClipboardList size={30} />
          </div>

          <h2 className='mt-5 text-xl font-semibold text-slate-800'>
            No tasks found
          </h2>

          <p className='mt-2 text-sm text-slate-500'>
            Create your first task to start working
          </p>
        </div>
      ) : (
        /* task cards */
        <div className='grid gap-6 lg:grid-cols-2'>
          {tasks.map((task) => (
            <div
              key={task._id}
              className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md'
            >
              {/* top section */}
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-xl font-semibold text-slate-800'>
                    {task.title}
                  </h3>

                  <p className='mt-2 text-sm leading-6 text-slate-500'>
                    {task.description || 'No description'}
                  </p>
                </div>
                {user?.role === 'admin' && (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className='rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 hover:bg-red-100'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* task info */}
              <div className='mt-5 flex flex-wrap gap-3'>
                <span className='rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-600'>
                  {task.priority || 'medium'}
                </span>

                <select
                  value={task.status || 'pending'}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className='rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 outline-none'
                >
                  <option value='pending'>Pending</option>
                  <option value='inProgress'>In Progress</option>
                  <option value='completed'>Completed</option>
                </select>

                {task.category && (
                  <span className='rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700'>
                    {task.category}
                  </span>
                )}
              </div>

              {/* deadline */}
              {task.deadline && (
                <p className='mt-5 text-sm text-slate-500'>
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Tasks
