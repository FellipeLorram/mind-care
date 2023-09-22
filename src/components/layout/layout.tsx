import {type ReactNode} from 'react'
import { Topbar } from './topbar'

export function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Topbar.Wrapper>
				<div className='flex items-center justify-between'>
					<Topbar.Logo />
					<Topbar.Actions />
				</div>
				<Topbar.Nav />
			</Topbar.Wrapper>
			<div className="w-full mt-2 py-4 md:py-6">
				{children}
			</div>
		</>
	)
}
