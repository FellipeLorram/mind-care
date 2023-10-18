import { useRouter } from 'next/router'
import { Topbar } from '@/components/layout/topbar'
import { api } from '@/lib/api'

export default function Page() {
	const { id } = useRouter().query
	const { data } = api.patients.getProfile.useQuery({
		patient_id: id as string
	});

	const patient = data?.patient;

	return (
		<div className='min-h-screen flex flex-col items-center justify-between'>
			<Topbar.Wrapper className='pb-4'>
				<div className='flex items-center justify-between'>
					<Topbar.Logo />
					<Topbar.Actions />
				</div>
			</Topbar.Wrapper>
			<div className='w-11/12 max-w-6xl mx-auto flex-1 flex flex-col justify-between items-center'>
				<div className='w-full flex md:items-center mx-auto gap-4 items-start justify-between flex-col md:flex-row my-10'>
					<h1 className='text-lg font-medium'>
						{patient?.name} - Notes
					</h1>
				</div>
			</div>
		</div>
	)
}
