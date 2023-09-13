import { LogoUnbordered } from "@/assets/logo-unbordered";
import { UserAvatar } from "../user-avatar";
import { NavLink } from "./nav-link";
import { ThemeSwitcher } from "./theme-switcher";
import { LogoBrain } from "@/assets/logo-brain";

export function Topbar() {
	return (
		<div className='w-full border-b md:px-12 gap-6 flex flex-col px-6 pt-6 md:pt-8'>
			<div className='flex flex-row items-center justify-between'>
				<LogoUnbordered className="w-36 hidden md:block" />
				<LogoBrain className="w-8 md:hidden" />
				<div className="flex items-center justify-center gap-2">
					<ThemeSwitcher />
					<UserAvatar />
				</div>
			</div>

			<nav className='flex flex-row items-center justify-start flex-1 gap-2 -mb-px'>
				<NavLink href="/">
					Patients
				</NavLink>

				<NavLink href="/schedule">
					Schedule
				</NavLink>

			</nav>
		</div>
	)
}
