import { UserAvatar } from "./user-avatar";
import { useRouter } from "next/router";
import Link from "next/link";
import { LogoBrain } from "@/assets/logo-brain";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";

export function Topbar() {
	return (
		<div className="w-full p-4 flex justify-start items-center gap-8 border-b border-gray-300">
			<LogoBrain
				className="w-10"
			/>
			<div className='flex gap-4 items-center justify-start flex-1'>
				<NavLink
					href='/patients'
				>
					Patients
				</NavLink>

				<NavLink
					href='/schedule'
				>
					Schedule
				</NavLink>
			</div>

			<Link
				className={buttonVariants({
					variant: 'secondary',
					className: 'flex items-center border border-gray-300',
				})}
				href='/patients/new'>
				<Plus 
					className='w-4 h-4 mr-2'
				/>
				<p>
					Add Patient
				</p>
			</Link>

			<UserAvatar />
		</div>
	)
}

interface NavLinkProps {
	href: string
	children: React.ReactNode
}

function NavLink({
	href,
	children,
}: NavLinkProps) {
	const { asPath } = useRouter();
	return (
		<Link
			className={`p-1 duration-200 ${href === asPath ? 'text-slate-900 font-medium' : 'text-gray-400 hover:text-slate-950'}`}
			href={href}
		>
			{children}
		</Link>
	)
}

