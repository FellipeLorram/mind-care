import React from 'react'
import { Topbar } from './topbar'

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Topbar />
			<div className="w-full mt-2 py-4 md:p-8">
				{children}
			</div>
		</>
	)
}
