import { Patients } from '@/components/layout/dashboard/patients'
import { Todaysappointments } from '@/components/layout/dashboard/todays-appointments'
import { WeekAppointments } from '@/components/layout/dashboard/week-appointments'
import { Layout } from '@/components/layout/layout'

export default function Page() {
  return (
    <Layout>
      <div className='w-full flex flex-col gap-6'>
        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-6'>
          <Patients />
          <Todaysappointments />
        </div>
        <WeekAppointments />
      </div>
    </Layout>
  )
}
