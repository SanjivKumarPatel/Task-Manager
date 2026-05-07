import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ClipboardList, Users, Bell } from 'lucide-react'

function Home() {
    const features = [
        {
            title: 'Task Management',
            description: 'Create, organize, and manage tasks with a clean workflow.',
            icon: ClipboardList
        },
        {
            title: 'Team Collabration',
            description: 'Collaborate with your team and manage projects efficiently.',
            icon: Users
        },
        {
      title: 'Notifications',
      description:
        'Stay updated with important activity and task reminders.',
      icon: Bell
    }
    ]

    return (
        <div className='w-full bg-gray-100'>
            {/* Hero */}
            <section className='px-6 py-16'>
                <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center'>

                    {/* Left */}
                    <div>
                        <div className='inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600'>
                            <CheckCircle2 size={18} />
                            Modern MERN Task Management Platform
                        </div>

                        <h1 className='mt-6 text-5xl font-bold leading-tight text-slate-900'>
                            Organize Work <br />

                            <span className='text-blue-600'>
                                Smarter & Faster
                            </span>
                        </h1>

                        <p className='mt-6 max-w-2xl text-lg leading-8 text-slate-600'>
                            TaskNova helps teams manage tasks, collaborate
                            efficiently, and stay productive with a modern workflow.
                        </p>

                        <div className='mt-8 flex flex-wrap gap-4'>
                            <Link
                            to='/register'
                            className='flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-medium text-white shadow-lg transition hover:bg-blue-700'>
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                            to='/login'
                            className='rounded-2xl border border-slate-300 bg-white px-7 py-4 font-medium text-slate-700 transition hover:bg-slate-200'>
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Right */}
                    <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-xl'>
                        <div className='border-b border-slate-200 pb-5'>
                            <h3 className='text-xl font-semibold text-slate-900'>
                                Why Choose TaskNova
                            </h3>

                            <p className='mt-1 text-sm text-slate-500'>
                                Clean workflow. Better productivity.
                            </p>
                        </div>

                        <div className='mt-8 space-y-5'>
                            {features.map((feature) =>{
                                const Icon = feature.icon

                                return (
                                    <div
                                      key={feature.title}
                                      className='felx items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-blue-50'
                                    >
                                      <div className='rounded-2xl bg-blue-100 p-3 text-blue-600'>
                                        <Icon size={24} />
                                      </div>

                                      <div>
                                        <h4 className='text-lg font-semibold text-slate-800'>
                                            {feature.title}
                                        </h4>

                                        <p className='mt-1 text-sm leading-6 text-slate-500'>
                                            {feature.description}
                                        </p>
                                      </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home