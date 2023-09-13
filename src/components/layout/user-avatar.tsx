import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu';

export function UserAvatar() {
	const { data: session } = useSession()
	const handleSignOut = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault()
		await signOut({
			callbackUrl: `${window.location.origin}/sign-in`,
			redirect: true
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						className='w-10'
						src={session?.user?.image ?? undefined}
					/>
					<AvatarFallback className='font-semibold text-black'>
						{session?.user?.name?.split(' ').map((name) => name[0])}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='shadow-md shadow-black'>
				<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Cobrança</DropdownMenuItem>
				<DropdownMenuItem>Inscrição</DropdownMenuItem>
				<DropdownMenuItem
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={e => handleSignOut(e)}>
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
