import { patientDataColumns } from '@/components/columns/patients'
import { DataTable } from '@/components/layout/data-table'
import { Layout } from '@/components/layout/layout'

export default function Page() {
	return (
		<Layout>
			<div className='w-full flex flex-col items-start justify-center gap-4 pt-10'>
				<DataTable columns={patientDataColumns} data={[]} />
			</div>
		</Layout>
	)
}
