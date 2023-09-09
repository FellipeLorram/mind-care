import { UserAvatar } from "./user-avatar";
import Link from "next/link";
import { LogoBrain } from "@/assets/logo-brain";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";

export function Topbar() {
	return (
		<div className="w-full p-4 flex justify-start items-center gap-4 md:gap-8 border-b border-gray-300">
			<div className="flex-1">
				<LogoBrain
					className="w-10"
				/>
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
