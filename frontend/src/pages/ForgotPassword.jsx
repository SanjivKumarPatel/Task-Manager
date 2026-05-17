import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authApi } from '../services/api'

function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)
        setError('')

        try {
            await authApi.forgotPassword(email)

            localStorage.setItem('resetEmail', email)
            toast.success('OTP sent to your email')
            navigate('/verify-otp')
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to send OTP'
            setError(message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-blue-50'>
            <div className='w-full max-w-md rounded-2xl border border-blue-100 bg-white shadow-lg p-8'>
                <div className='text-center mb-8'>
                    <div className='flex justify-center mb-4'>
                        <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl'>
                            🔐
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold tracking-tight'>
                        <span className='text-slate-900'>Task</span>
                        <span className='text-blue-600'>Nova</span>
                    </h1>
                </div>

                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-semibold text-slate-900'>Reset Password</h2>
                    <p className='text-slate-600 mt-2 text-sm'>
                        Enter your email to receive an OTP
                    </p>
                </div>

                {error && (
                    <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>
                            Email Address
                        </label>
                    <input
                      type='email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='example@gmail.com'
                      className='w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-200' />
                    </div>

                    <button
                      type='submit'
                      disabled={loading}
                      className='w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? 'Sending...' : 'Send OTP'}
                      </button>
                </form>

                <div className='mt-6 text-center text-sm text-slate-600'>
                    Remember your password?{' '}
                    <Link to='/login' className='text-blue-600 hover:text-blue-700 font-medium'>
                      Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword