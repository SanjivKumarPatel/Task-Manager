import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { authApi } from '../services/api'
import registerBg from '../assets/login-bg.jpg'

function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Password do not match')
      return
    }

    try {
      setLoading(true)

      const res = await authApi.register(
        formData.name,
        formData.email,
        formData.password
      )

      register(res.data.user, res.data.token)

      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      {/* overlay */}
      <div className='absolute inset-0 bg-black/45'></div>

      {/* card */}
      <div className='relative z-10 w-full max-w-md rounded-[28px] border border-blue-400/30 bg-[#04112ad9] backdrop-blur-xl shadow-[0_0_35px_rgba(59,130,246,0.25)] px-8 py-10'>
        {/* logo */}
        <div className='text-center mb-6'>
          <div className='flex justify-center mb-3'>
            <div className='w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 text-2xl'>
              ✦
            </div>
          </div>

          <h1 className='text-5xl font-bold tracking-tight'>
            <span className='text-white'>Task</span>
            <span className='text-blue-500'>Nova</span>
          </h1>

          <p className='mt-2 text-[11px] tracking-[4px] text-gray-400 uppercase'>
            Organize. Collaborate. Achieve.
          </p>
        </div>

        {/* divider */}
        <div className='flex items-center gap-3 mb-7'>
          <div className='h-px flex-1 bg-blue-400/20'></div>
          <div className='w-2 h-2 rounded-full bg-blue-500'></div>
          <div className='h-px flex-1 bg-blue-400/20'></div>
        </div>

        {/* heading */}
        <div className='text-center mb-6'>
          <h2 className='text-3xl font-semibold text-white'>
            Create Account ✨
          </h2>

          <p className='text-gray-300 mt-2 text-sm'>
            Start your productivity journey
          </p>
        </div>

        {/* error */}
        {error && (
          <div className='mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
            {error}
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* name */}
          <div>
            <label className='block text-sm text-gray-200 mb-2'>
              Full name
            </label>
            <input
              type='text'
              name='name'
              required
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your full name'
              className='w-full rounded-xl border border-blue-400/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-blue-500/30'
            />
          </div>

          {/* email */}
          <div>
            <label className='block text-sm text-gray-200 mb-2'>Email</label>

            <input
              type='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full rounded-xl border border-blue-400/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-blue-500/30'
            />
          </div>

          {/* password */}
          <div>
            <label className='block text-sm text-gray-200 mb-2'>Password</label>

            <input
              type='password'
              name='password'
              required
              value={formData.password}
              onChange={handleChange}
              placeholder='Create password'
              className='w-full rounded-xl border border-blue-400/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
            />
          </div>

          {/* confirm password */}
          <div>
            <label className='block text-sm text-gray-200 mb-2'>
              Confirm password
            </label>

            <input
              type='password'
              name='confirmPassword'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm password'
              className='w-full rounded-xl border border-blue-400/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
            />
          </div>

          {/* submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-white font-semibold hover:opacity-95 transition disabled:opacity-60'
          >
            {loading ? 'Creating Account...' : 'Create Account ➡️'}
          </button>

          {/* footer divider */}
          <div className='mt-7 flex items-center gap-3'>
            <div className='h-px flex-1 bg-blue-400/20'></div>
            <div className='w-2 h-2 rounded-full bg-blue-500'></div>
            <div className='h-px flex-1 bg-blue-400/20'></div>
          </div>

          {/* footer */}
          <p className='text-center text-sm text-gray-300 mt-6'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-400 hover:text-blue-300 font-medium'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
