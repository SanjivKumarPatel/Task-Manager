import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ClipboardList } from 'lucide-react'

import { taskApi } from '../services/api.js'
import Loader from '../components/Loader.jsx'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editTaskId, setEditTaskId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    category: ''
  })

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

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      deadline: '',
      priority: 'medium',
      category: ''
    })
    setEditTaskId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      return setError('Task title is required')
    }

    try {
      setError('')
      if (editTaskId) {
        const res = await taskApi.updateTask(
          editTaskId,
          formData.title,
          formData.description,
          formData.deadline,
          formData.priority,
          formData.category,
          'pending'
        )

        setTasks((prev) =>
          prev.map((task) => (task._id === editTaskId ? res.data.task : task))
        )
      } else {
        const res = await taskApi.createTask(
          formData.title,
          formData.description,
          formData.deadline,
          formData.priority,
          formData.category
        )

        setTasks((prev) => [res.data.task, ...prev])
      }

      resetForm()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task')
    }
  }

  const handleEdit = (task) => {
    setShowForm(true)
    setEditTaskId(task._id)

    setFormData({
      title: task.title,
      description: task.description || '',
      deadline: task.deadline ? task.deadline.split('T')[0] : '',
      priority: task.priority || 'medium',
      category: task.category || ''
    })
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

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
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

      {/* form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className='mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
        >
          <h2 className='mb-5 text-xl font-semibold text-slate-800'>
            {editTaskId ? 'Edit Task' : 'Create New Task'}
          </h2>

          <div className='space-y-5'>
            <input
              type='text'
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }
              placeholder='Title of the Task'
              className='w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600'
            />

            <textarea
              rows='4'
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
              placeholder='Description of the Task'
              className='w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500'
            ></textarea>
            <div className='grid gap-4 md:grid-cols-2'>
              <input
                type='date'
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deadline: e.target.value
                  })
                }
                className='rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500'
              />
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value
                  })
                }
                className='rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500'
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>

            <input
              type='text'
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value
                })
              }
              placeholder='Category'
              className='w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500'
            />

            <div className='flex gap-3'>
              <button
                type='submit'
                className='rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700'
              >
                {editTaskId ? 'Save Changes' : 'Create Task'}
              </button>

              <button
                type='button'
                onClick={resetForm}
                className='rounded-2xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100'
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
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
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEdit(task)}
                    className='rounded-xl border border-green-200 bg-green-50 p-3 text-green-600 hover:bg-green-100'
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className='rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 hover:bg-red-100'
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
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
