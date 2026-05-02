import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, User, ChevronDown, LogOut } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!isLoggedIn) return null


  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className='h-[90px] bg-[#050b1a] border-b border-blue-500/10 px-8 flex items-center justify-between'>
      {/* search */}
      <div className='relative w-full max-w-xl'>
        <Search
          size={20}
          className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400'
        />

        <input
          type='text'
          placeholder='Search anything...'
          className='w-full h-14 rounded-2xl border border-blue-500/10 bg-[#0b1328] pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition'
        />
      </div>

      {/* right side */}
      <div className='ml-8 flex items-center gap-4'>
        {/* notifications */}
        <button className='relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/10 bg-[#0b1328] text-white hover:border-blue-500 transition'>
          <Bell size={20} />

          <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white'>
            3
          </span>
        </button>

        {/* profile */}
        <div className='flex items-center gap-3 rounded-2xl border border-blue-500/10 bg-[#0b1328] px-4 py-2 min-w-[220px]'>
          <div className='flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white'>
            <User size={18} />
          </div>

          <div className='flex-1 leading-tight'>
            <p className='text-sm font-semibold text-white'>
              {user?.name || 'User'}
            </p>

            <p className='text-xs text-slate-400 capitalize'>
              {user?.role || 'Member'}
            </p>
          </div>

          <ChevronDown size={18} className='text-slate-400' />
        </div>

        {/* logout */}
        <button
          onClick={handleLogout}
          className='flex h-12 items-center gap-2 rounded-2xl border border-blue-500/10 bg-[#0b1328] px-5 text-white hover:border-red-500 transition'
        >
          <LogOut size={18} />

          <span className='text-sm font-medium'>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
