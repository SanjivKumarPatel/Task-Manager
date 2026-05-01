import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function DashboardLayout({ children }) {
  return (
    <div className='min-h-screen bg-[#f8fafc] flex'>
        {/* sidebar */}
        <Sidebar />

        {/* right section */}
        <div className='flex-1 flex flex-col min-h-screen'>
          {/* Navbar */}
          <Navbar />

          {/* Page content */}
          <main className='flex-1 p-6 overflow-y-auto'>{children}</main>
        </div>
    </div>
  )
}

export default DashboardLayout
