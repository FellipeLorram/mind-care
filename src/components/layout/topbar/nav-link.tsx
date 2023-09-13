import Link from "next/link";
import { useRouter } from "next/router";

type NavLinkProps = {
	href: string;
	children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
	const { asPath } = useRouter();

	return (
		<Link
			className={`whitespace-nowrap border-b pb-4 text-sm pt-2 leading-none transition px-4 hover:text-primary ${asPath === href ? 'border-pink-400 text-primary font-semibold' : 'border-transparent hover:border-muted-foreground text-muted-foreground'}`}
			href={href}>
			{children}
		</Link>
	)
}
