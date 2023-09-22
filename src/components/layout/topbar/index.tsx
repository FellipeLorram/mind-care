import { type ReactNode } from "react";
import { LogoUnbordered } from "@/assets/logo-unbordered";
import { UserAvatar } from "../user-avatar";
import { NavLink } from "./nav-link";
import { ThemeSwitcher } from "./theme-switcher";
import { LogoBrain } from "@/assets/logo-brain";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

function Wrapper({ children, ...props }: WrapperProps) {
	return (
		<div {...props}
			className={cn('w-full border-b md:px-12 gap-4 flex flex-col px-6 pt-6 md:pt-6', props.className)}
		>
			{children}
		</div>
	)
}

function Logo({ props }: { props?: React.HTMLAttributes<HTMLDivElement> }) {
	return (
		<div {...props} className="flex flex-row items-center justify-between">
			<Link href="/">
				<LogoUnbordered className="w-36 hidden md:block" />
				<LogoBrain className="w-8 md:hidden" />
			</Link>
		</div>
	)
}

function Actions({ props }: { props?: React.HTMLAttributes<HTMLDivElement> }) {
	return (
		<div {...props} className="flex items-center justify-center gap-2">
			<ThemeSwitcher />
			<UserAvatar />
		</div>
	)
}

function Nav() {
	return (
		<nav className='flex flex-row items-center justify-start flex-1 gap-2 -mb-px'>
			<NavLink href="/">
				Patients
			</NavLink>

			<NavLink href="/schedule">
				Schedule
			</NavLink>

		</nav>
	)
}

export const Topbar = {
	Wrapper,
	Logo,
	Nav,
	Actions
}
