import { type ReactNode } from 'react'
import { Topbar } from '../topbar'

export function AddPatientLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex gap-2 flex-col">
			<Topbar.Wrapper className="py-6">
				<div className='flex items-center justify-between'>
					<Topbar.Logo />
					<Topbar.Actions />
				</div>
			</Topbar.Wrapper>
			<div className="w-11/12 max-w-2xl mx-auto mt-4">
				<h1 className="font-medium text-lg">
					Add a new patient
				</h1>
			</div>
			{children}
		</div>
	)
}
